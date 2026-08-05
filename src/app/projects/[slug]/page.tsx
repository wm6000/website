import { notFound } from "next/navigation";

import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {project.name}
      </h1>
      <p className="mt-4 text-muted-foreground">{project.description}</p>
      <p className="mt-8 text-sm text-muted-foreground">
        More details coming soon.
      </p>
    </div>
  );
}
