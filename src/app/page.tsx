import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Welcome</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        This site hosts the Fitness Advisor, the Ski Advisor, and a collection
        of standalone projects.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/fitness-advisor"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Fitness Advisor
        </Link>
        <Link
          href="/ski-advisor"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Ski Advisor
        </Link>
        <Link
          href="/projects"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Projects
        </Link>
      </div>
    </div>
  );
}
