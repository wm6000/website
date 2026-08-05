import Link from "next/link";

import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-muted-foreground">
        Standalone projects showcased alongside the platform.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="block h-full rounded-lg border border-border p-5 transition-colors hover:bg-muted"
            >
              <h2 className="font-medium">{project.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
