"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Session } from "next-auth";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth-button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/fitness-platform", label: "Fitness Platform" },
  { href: "/ski-advisor", label: "Ski Advisor" },
  { href: "/projects", label: "Projects" },
] as const;

export function SiteNav({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenForPathname, setMenuOpenForPathname] = useState(pathname);

  if (pathname !== menuOpenForPathname) {
    setMenuOpenForPathname(pathname);
    setMenuOpen(false);
  }

  const isItemActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex w-full max-w-3xl items-center gap-1 px-6">
        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isItemActive(item.href) ? "page" : undefined}
              className={cn(
                "border-b-2 px-3 py-4 text-sm font-medium transition-colors",
                isItemActive(item.href)
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto hidden sm:block">
          <AuthButton session={session} />
        </div>

        <Button
          variant="ghost"
          size="icon-lg"
          className="ml-auto sm:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {menuOpen && (
        <div className="border-t border-border sm:hidden">
          <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isItemActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium transition-colors",
                  isItemActive(item.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-1 border-t border-border pt-2">
              <AuthButton session={session} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
