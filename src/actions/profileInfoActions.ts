'use server';
import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function saveProfile(formData: FormData) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const session = await getServerSession(authOptions);
    if (!session) throw "You need to be logged in.";
    const email = session.user?.email;

    const { username, displayName, bio, coverUrl, avatarUrl } = Object.fromEntries(formData);

    // Vérification d'unicité du username
    const existingUser = await ProfileInfoModel.findOne({ username, email: { $ne: email } });
    if (existingUser) {
      throw new Error("Username already taken. Please choose another one.");
    }

    // Sauvegarde ou mise à jour dans la collection profileinfos
    const profileInfoDoc = await ProfileInfoModel.findOne({ email });
    if (profileInfoDoc) {
      profileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
      await profileInfoDoc.save();
      console.log("Profile updated:", profileInfoDoc);
    } else {
      const newProfile = await ProfileInfoModel.create({
        username,
        displayName,
        bio,
        email,
        coverUrl,
        avatarUrl,
      });
      console.log("Profile created:", newProfile);
    }

    // Vérifier que la connexion MongoDB est bien établie
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    // Mise à jour dans la collection users
    const usersCollection = db.collection("users");
    await usersCollection.updateOne(
      { email },
      { $set: { username } } // Mettre à jour uniquement le username
    );

    return true;
  } catch (error) {
    console.error("Error saving profile:", error);

    // Gestion des erreurs
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to save profile.");
    } else {
      throw new Error("An unknown error occurred while saving the profile.");
    }
  }
}
