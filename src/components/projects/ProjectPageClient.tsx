"use client";

import { useEffect } from "react";
import { getProjectBySlug } from "@/data/portfolio";
import { Experience } from "@/components/Experience";
import { useExperience } from "@/context/ExperienceContext";

export function ProjectPageClient({ slug }: { slug: string }) {
  return (
    <Experience>
      <OpenOnMount slug={slug} />
    </Experience>
  );
}

function OpenOnMount({ slug }: { slug: string }) {
  const { openProject, activeProject } = useExperience();
  useEffect(() => {
    const project = getProjectBySlug(slug);
    if (project && !activeProject) openProject(project);
  }, [slug, openProject, activeProject]);
  return null;
}
