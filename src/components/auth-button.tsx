"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { CircleUserRound } from "lucide-react";
import type { Session } from "next-auth";

import { Button } from "@/components/ui/button";

export function AuthButton({ session }: { session: Session | null }) {
  const pathname = usePathname();

  if (session?.user) {
    return (
      <div className="flex items-center gap-1">
        <Link
          href="/profile"
          aria-label="Profile"
          className="flex size-8 items-center justify-center overflow-hidden rounded-full transition-opacity hover:opacity-80"
        >
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt=""
              referrerPolicy="no-referrer"
              className="size-8 rounded-full"
            />
          ) : (
            <CircleUserRound className="size-6 text-muted-foreground" />
          )}
        </Link>
        <Button variant="ghost" size="sm" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  if (pathname === "/login") {
    return (
      <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/join" />}>
        Join
      </Button>
    );
  }

  if (pathname === "/join") {
    return (
      <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/login" />}>
        Log in
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/login" />}>
        Log in
      </Button>
      <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/join" />}>
        Join
      </Button>
    </div>
  );
}
