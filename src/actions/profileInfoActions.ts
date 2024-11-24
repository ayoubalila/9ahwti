'use server';
import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function saveProfile(formData: FormData) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Get the authenticated user's email
    const session = await getServerSession(authOptions);
    if (!session) throw "You need to be logged in.";
    const email = session.user?.email;

    // Extract data from the formData
    const {
      username,
      displayName,
      bio,
      coverUrl,
      avatarUrl,
    } = Object.fromEntries(formData);

    // Find the user's profile document in MongoDB
    const profileInfoDoc = await ProfileInfoModel.findOne({ email });
    if (profileInfoDoc) {
      // Update the existing document
      profileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
      await profileInfoDoc.save();
    } else {
      // Create a new document if it doesn't exist
      await ProfileInfoModel.create({
        username,
        displayName,
        bio,
        email,
        coverUrl,
        avatarUrl,
      });
    }

    return true;
  } catch (error) {
    console.error("Error saving profile:", error);
    throw new Error("Failed to save profile.");
  }
}
