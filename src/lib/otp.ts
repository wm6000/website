import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";

export const OTP_COOKIE_NAME = "otp_challenge";
export const OTP_TTL_SECONDS = 5 * 60;

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export function generateOtpCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

function hashOtpCode(email: string, code: string): string {
  return crypto
    .createHmac("sha256", process.env.AUTH_SECRET!)
    .update(`${email.toLowerCase()}:${code}`)
    .digest("hex");
}

// Encodes {email, codeHash} in a signed, short-lived JWT so the pending code
// can live in an httpOnly cookie instead of a database — website has no
// persistence layer until data-platform (Phase 3) exists.
export async function createOtpChallenge(
  email: string,
  code: string
): Promise<string> {
  return new SignJWT({ email: email.toLowerCase(), codeHash: hashOtpCode(email, code) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${OTP_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifyOtpChallenge(
  token: string,
  email: string,
  code: string
): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.email !== email.toLowerCase()) return false;

    const expected = Buffer.from(hashOtpCode(email, code));
    const actual = Buffer.from(String(payload.codeHash ?? ""));
    if (expected.length !== actual.length) return false;

    return crypto.timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
