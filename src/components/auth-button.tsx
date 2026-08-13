"use client";

import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

import { Button } from "@/components/ui/button";

export function AuthButton({ session }: { session: Session | null }) {
  if (session?.user) {
    return (
      <Button variant="ghost" size="sm" onClick={() => signOut()}>
        Sign out
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => signIn("google")}>
      Sign in
    </Button>
  );
}
