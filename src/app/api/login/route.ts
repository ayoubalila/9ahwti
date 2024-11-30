import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const db = (await client.connect()).db("KAHWTI");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.NEXTAUTH_SECRET as string, {
      expiresIn: "1h",
    });

    // Return the token for the client
    return NextResponse.json(
      { message: "Login successful.", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login process:", error);
    return NextResponse.json(
      { error: "An error occurred during login." },
      { status: 500 }
    );
  }
}
