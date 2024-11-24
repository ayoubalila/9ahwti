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

    const profileInfoDoc = await ProfileInfoModel.findOne({ email });
    if (profileInfoDoc) {
      // Update the existing profile
      profileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
      await profileInfoDoc.save();
      console.log("Profile updated:", profileInfoDoc);
    } else {
      // Create a new profile if it doesn't exist
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

    return true;
  } catch (error) {
    console.error("Error saving profile:", error);
    throw new Error("Failed to save profile.");
  }
}
