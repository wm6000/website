"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";

import { cn } from "@/lib/utils";
import { AuthButton } from "@/components/auth-button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/fitness-platform", label: "Fitness Platform" },
  { href: "/ski-advisor", label: "Ski Advisor" },
  { href: "/projects", label: "Projects" },
] as const;

export function SiteNav({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex w-full max-w-3xl items-center gap-1 px-6">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "border-b-2 px-3 py-4 text-sm font-medium transition-colors",
                isActive
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <div className="ml-auto">
          <AuthButton session={session} />
        </div>
      </nav>
    </header>
  );
}
