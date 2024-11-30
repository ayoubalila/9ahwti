import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/lib/db";
import bcrypt from "bcrypt";
import { AuthOptions, DefaultSession } from "next-auth";

// Étendre les types de session utilisateur
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = (await client.connect()).db("KAHWTI");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(credentials?.password || "", user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt", // Utilisez toujours JWT pour les sessions
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
  },
};
