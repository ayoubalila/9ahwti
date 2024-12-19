import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import client from "@/lib/db";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const email = session.user.email;

    // Vérifier si l'utilisateur a un profil dans la collection "profileinfos"
    const profileInfo = await ProfileInfoModel.findOne({ email });
    if (profileInfo) {
      return new Response(
        JSON.stringify({
          avatarUrl: profileInfo.avatarUrl || '/images/default-avatar.png', // Avatar personnalisé ou par défaut
          username: profileInfo.username, // Username depuis profileinfos
        }),
        { status: 200 }
      );
    }

    // Si pas de profil, chercher dans la collection "users"
    const db = (await client.connect()).db("KAHWTI");
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        avatarUrl: '/images/default-avatar.png', // Par défaut si pas d'avatar configuré
        username: user.username || 'User', // Username depuis la collection users
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch profile data" }),
      { status: 500 }
    );
  }
}
