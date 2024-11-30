import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ProfileInfoModel } from "@/models/ProfileInfo";

export async function POST(req: Request) {
  const { username, displayName, bio } = await req.json();

  if (!username) {
    return NextResponse.json({ error: "Username is required." }, { status: 400 });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const existingProfile = await ProfileInfoModel.findOne({ username });
    if (existingProfile) {
      return NextResponse.json(
        { error: "Username is already taken." },
        { status: 400 }
      );
    }

    const newProfile = await ProfileInfoModel.create({
      username,
      displayName,
      bio,
      email: "user@example.com", // Replace with logged-in user's email
    });

    return NextResponse.json({ message: "Profile created successfully.", newProfile });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating profile." }, { status: 500 });
  }
}