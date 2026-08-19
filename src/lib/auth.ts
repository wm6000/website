import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

import { OTP_COOKIE_NAME, verifyOtpChallenge } from "@/lib/otp";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      id: "otp",
      name: "Email code",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const code = credentials?.code;
        if (typeof email !== "string" || typeof code !== "string") return null;

        const cookieStore = await cookies();
        const token = cookieStore.get(OTP_COOKIE_NAME)?.value;
        if (!token) return null;

        const valid = await verifyOtpChallenge(token, email, code);
        if (!valid) return null;

        cookieStore.delete(OTP_COOKIE_NAME);
        return { id: email.toLowerCase(), email: email.toLowerCase() };
      },
    }),
  ],
  session: { strategy: "jwt" },
});
