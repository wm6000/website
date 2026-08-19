"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Step = "email" | "code";
type Mode = "signin" | "join";

const COPY: Record<
  Mode,
  {
    heading: string;
    sendCodeLabel: string;
    switchPrompt: string;
    switchHref: string;
    switchLabel: string;
  }
> = {
  signin: {
    heading: "Sign in",
    sendCodeLabel: "Sign in",
    switchPrompt: "New here?",
    switchHref: "/join",
    switchLabel: "Create an account",
  },
  join: {
    heading: "Create your account",
    sendCodeLabel: "Create account",
    switchPrompt: "Already have an account?",
    switchHref: "/login",
    switchLabel: "Log in",
  },
};

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const copy = COPY[mode];
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSendCode(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Could not send code. Check the email address and try again.");
      }

      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send code");
    } finally {
      setPending(false);
    }
  }

  async function handleVerifyCode(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const result = await signIn("otp", { email, code, redirect: false });
      if (!result || result.error) {
        throw new Error("Incorrect or expired code");
      }

      router.push("/profile");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect or expired code");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{copy.heading}</h1>

      <Button
        className="mt-8"
        variant="outline"
        onClick={() => signIn("google", { callbackUrl: "/profile" })}
      >
        Continue with Google
      </Button>

      <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        or
        <div className="h-px flex-1 bg-border" />
      </div>

      {step === "email" ? (
        <form className="mt-8 flex flex-col gap-3" onSubmit={handleSendCode}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" disabled={pending}>
            {pending ? "Sending…" : copy.sendCodeLabel}
          </Button>
        </form>
      ) : (
        <form className="mt-8 flex flex-col gap-3" onSubmit={handleVerifyCode}>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to {email}. It expires in 5 minutes.
          </p>
          <Label htmlFor="code">Code</Label>
          <Input
            id="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <Button type="submit" disabled={pending}>
            {pending ? "Verifying…" : "Verify code"}
          </Button>
          <button
            type="button"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            onClick={() => {
              setStep("email");
              setCode("");
              setError(null);
            }}
          >
            Use a different email
          </button>
        </form>
      )}

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <p className="mt-8 text-sm text-muted-foreground">
        {copy.switchPrompt}{" "}
        <Link href={copy.switchHref} className="text-foreground underline-offset-4 hover:underline">
          {copy.switchLabel}
        </Link>
      </p>
    </div>
  );
}
