import NextAuth, { AuthOptions } from "next-auth"
import { authOptions } from "@/app/lib/authOptions";

const handler = NextAuth (authOptions as AuthOptions);

export { handler as GET, handler as POST }