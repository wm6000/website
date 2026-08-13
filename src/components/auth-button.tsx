"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

import { Button } from "@/components/ui/button";

export function AuthButton({ session }: { session: Session | null }) {
  if (session?.user) {
    return (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" render={<Link href="/profile" />}>
          Profile
        </Button>
        <Button variant="ghost" size="sm" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => signIn("google")}>
      Sign in
    </Button>
  );
}
