import Link from "next/link";

import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { SkiDashboard } from "@/components/ski-advisor/ski-dashboard";

export default async function SkiAdvisorPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Ski Advisor</h1>

      {!isLoggedIn && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            Check this out — this is a preview with example data. Log in to
            get started.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Log in
          </Button>
        </div>
      )}

      <SkiDashboard isLoggedIn={isLoggedIn} />
    </div>
  );
}
