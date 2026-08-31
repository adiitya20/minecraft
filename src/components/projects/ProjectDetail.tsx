"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { MoodDetectorVisualization } from "./MoodDetectorVisualization";
import { useExperience } from "@/context/ExperienceContext";
import { prefersReducedMotion } from "@/lib/motion";
import { playClick } from "@/lib/mcSound";

export function ProjectDetail() {
  const { activeProject, closeProject } = useExperience();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProject]);

  useEffect(() => {
    if (!activeProject || !root.current || prefersReducedMotion()) return;
    gsap.fromTo(
      root.current,
      { clipPath: "inset(12% 12% 12% 12%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power4.inOut" },
    );
  }, [activeProject]);

  if (!activeProject) return null;
  const project = activeProject;

  return (
    <section
      ref={root}
      className="fixed inset-0 z-[80] overflow-y-auto bg-[#141612] text-[#e2dfd5]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      {/* Modal Header */}
      <div className="site-pad flex items-center justify-between py-6 border-b-4 border-[#000] bg-[#1a1d17]">
        <div className="flex items-center gap-3 font-pixel text-xs text-[#ffaa00]">
          <span>⛏️ CRAFTED ITEM {project.number}</span>
          <span>•</span>
          <span className="text-[#55ffff]">{project.category.toUpperCase()}</span>
        </div>

        <button
          type="button"
          className="font-pixel text-xs text-[#ffffff] bg-[#ff3300] hover:bg-[#ff5522] border-2 border-[#000] px-4 py-2"
          onClick={() => {
            playClick();
            closeProject();
          }}
        >
          [ CLOSE ESC ]
        </button>
      </div>

      <div className="site-pad py-12 max-w-6xl mx-auto space-y-10">
        <h2
          id="project-detail-title"
          className="font-pixel text-[clamp(1.8rem,4vw,3.5rem)] text-[#ffaa00] leading-tight drop-shadow-[0_4px_0_#000]"
        >
          {project.title}
        </h2>

        <p className="font-vt323 text-2xl text-[#a8a499] max-w-3xl leading-relaxed bg-[#1d211a] p-6 border-4 border-[#000]">
          {project.description}
        </p>

        {/* System Architecture Visualization */}
        <div className="mc-box p-6 bg-[#181a15]">
          <p className="font-pixel text-xs text-[#55ff55] mb-4">SYSTEM ARCHITECTURE MATRIX</p>
          {project.id === 3 ? (
            <MoodDetectorVisualization active />
          ) : (
            <ArchitectureDiagram project={project} />
          )}
        </div>

        {/* Details Grid */}
        <div className="grid gap-8 lg:grid-cols-2 font-vt323 text-xl">
          <DetailBlock title="OVERVIEW" body={project.description} />
          {"problem" in project && project.problem ? (
            <DetailBlock title="THE PROBLEM" body={project.problem} />
          ) : null}
          {"solution" in project && project.solution ? (
            <DetailBlock title="CRAFTED SOLUTION" body={project.solution} />
          ) : null}
          {"contribution" in project && project.contribution ? (
            <DetailBlock title="MY CONTRIBUTION" body={project.contribution} />
          ) : null}
        </div>

        {/* Features List */}
        <div className="mc-box p-6 bg-[#1a1d17]">
          <p className="font-pixel text-xs text-[#ffaa00] mb-4">KEY FEATURES & ATTRIBUTES</p>
          <ul className="grid gap-3 sm:grid-cols-2 font-vt323 text-xl text-[#e2dfd5]">
            {project.features.map((feature) => (
              <li key={feature} className="bg-[#121410] p-3 border-2 border-[#000] flex items-center gap-2">
                <span className="text-[#55ff55]">✔</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies List */}
        <div className="mc-box p-6 bg-[#1a1d17]">
          <p className="font-pixel text-xs text-[#55ffff] mb-4">REQUIRED CRAFTING INGREDIENTS</p>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="font-pixel text-[10px] text-[#e2dfd5] bg-[#000] border-2 border-[#55ffff]/40 px-3 py-2"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="mc-box p-6 bg-[#1b1e19]">
      <p className="font-pixel text-xs text-[#ffaa00] mb-2">{title}</p>
      <p className="text-[#e2dfd5] leading-relaxed">{body}</p>
    </div>
  );
}
