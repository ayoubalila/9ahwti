import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const profile = await ProfileInfoModel.findOne({ email: session.user.email });
    if (!profile) {
      return new Response(JSON.stringify({ error: "Profile not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch profile data" }), { status: 500 });
  }
}
