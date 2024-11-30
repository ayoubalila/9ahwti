import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import client from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const db = (await client.connect()).db("KAHWTI");
    const usersCollection = db.collection("users");

    // Vérifier si l'email ou le nom d'utilisateur existent déjà
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 400 }
      );
    }

    const existingUsername = await usersCollection.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { error: "Username is already taken." },
        { status: 400 }
      );
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    await usersCollection.insertOne({
      email,
      username,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Account created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { error: "An error occurred during sign-up." },
      { status: 500 }
    );
  }
}
