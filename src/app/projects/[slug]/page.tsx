import { notFound } from "next/navigation";
import { getProjectBySlug, portfolioData } from "@/data/portfolio";
import { ProjectPageClient } from "@/components/projects/ProjectPageClient";

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectPageClient slug={slug} />;
}
