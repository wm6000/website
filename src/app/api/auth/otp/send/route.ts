import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";

import {
  createOtpChallenge,
  generateOtpCode,
  OTP_COOKIE_NAME,
  OTP_TTL_SECONDS,
} from "@/lib/otp";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email sign-in is not configured" },
      { status: 503 }
    );
  }

  const code = generateOtpCode();
  const token = await createOtpChallenge(email, code);

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Your sign-in code",
    text: `Your sign-in code is ${code}. It expires in 5 minutes.`,
  });

  if (error) {
    return NextResponse.json({ error: "Could not send code" }, { status: 502 });
  }

  const cookieStore = await cookies();
  cookieStore.set(OTP_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: OTP_TTL_SECONDS,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
