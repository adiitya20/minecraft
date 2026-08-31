"use client";

import { useRef } from "react";
import type { Project } from "@/data/portfolio";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { MoodDetectorVisualization } from "./MoodDetectorVisualization";
import { useExperience } from "@/context/ExperienceContext";
import { playClick, playItemHover } from "@/lib/mcSound";

type Props = {
  project: Project;
  active: boolean;
};

const RARITIES: Record<number, { label: string; color: string; border: string }> = {
  1: { label: "★ LEGENDARY AI ITEM", color: "#ffaa00", border: "#ffaa00" },
  2: { label: "★ EPIC FULL-STACK ITEM", color: "#55ffff", border: "#55ffff" },
  3: { label: "★ RARE VISION ITEM", color: "#55ff55", border: "#55ff55" },
};

export function ProjectCard({ project, active }: Props) {
  const visual = useRef<HTMLDivElement>(null);
  const { openProject, setCursorMode } = useExperience();

  const rarity = RARITIES[project.id] || { label: "RARE ITEM", color: "#ffaa00", border: "#ffaa00" };

  return (
    <article className="project-slide relative flex h-full min-h-[100svh] w-screen shrink-0 flex-col justify-center px-[var(--pad)] py-16">
      <div className="mc-box p-6 sm:p-10 bg-[#1d211a] grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          {/* Rarity & Number Badge */}
          <div className="flex items-center gap-3">
            <span className="font-pixel text-[10px] text-[#000] bg-[#ffaa00] px-2.5 py-1 border border-[#000]">
              SLOT {project.number}
            </span>
            <span className="font-pixel text-[10px]" style={{ color: rarity.color }}>
              {rarity.label}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-pixel text-[clamp(1.6rem,4vw,3.2rem)] text-[#ffffff] mt-4 leading-tight tracking-wide drop-shadow-[0_4px_0_#000]">
            {project.title}
          </h3>

          {/* Category */}
          <p className="font-pixel text-[11px] text-[#55ffff] mt-3">
            CATEGORY: {project.category.toUpperCase()}
          </p>

          {/* Description */}
          <p className="font-vt323 text-xl text-[#a8a499] mt-4 max-w-xl leading-relaxed bg-[#141612] p-4 border-2 border-[#000]">
            {project.description}
          </p>

          {/* 3x3 Crafting Recipe Ingredients */}
          <div className="mt-6">
            <p className="font-pixel text-[10px] text-[#ffaa00] mb-2">
              REQUIRED INGREDIENTS:
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="font-pixel text-[9px] text-[#e2dfd5] bg-[#292f25] border-2 border-[#000] px-2.5 py-1.5 shadow-[inset_-2px_-2px_0_#141712]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Enchanted Craft CTA Button */}
          <div className="mt-8">
            <button
              type="button"
              className="enchanted-glow font-pixel text-xs text-[#ffffff] bg-[#55a828] hover:bg-[#7cbd38] border-4 border-[#000] px-8 py-4 shadow-[inset_-4px_-4px_0_#2b4d13,inset_4px_4px_0_#8de84e] flex items-center gap-3 transition-transform hover:-translate-y-1"
              onClick={() => {
                playClick();
                openProject(project);
              }}
              onMouseEnter={playItemHover}
            >
              <span>⛏️</span>
              <span>INSPECT CRAFTED ITEM</span>
            </button>
          </div>
        </div>

        {/* Right side Visual / Architecture Diagram */}
        <div
          ref={visual}
          className="project-visual mc-box p-4 bg-[#141612]"
          onMouseEnter={() => setCursorMode("view")}
          onMouseLeave={() => setCursorMode("default")}
        >
          {project.id === 1 && <DeepfakeVisual />}
          {project.id === 2 && <GrillHouseVisual />}
          {project.id === 3 && <MoodDetectorVisualization active={active} />}
          <div className="mt-6">
            <ArchitectureDiagram project={project} active={active} />
          </div>
        </div>
      </div>
    </article>
  );
}

function DeepfakeVisual() {
  return (
    <div className="relative overflow-hidden border-4 border-[#000] bg-[#1a1d17] p-3">
      <p className="font-pixel text-[10px] text-[#55ffff] mb-2">MULTIMODAL ANALYSIS MATRIX</p>
      <div className="grid grid-cols-6 gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square border-2 border-[#000] flex items-center justify-center font-pixel text-[8px]"
            style={{
              background: i % 2 === 0 ? "#55a828" : "#ff3300",
              color: "#ffffff",
            }}
          >
            {i % 2 === 0 ? "REAL" : "FAKE"}
          </div>
        ))}
      </div>
    </div>
  );
}

function GrillHouseVisual() {
  return (
    <div className="relative border-4 border-[#000] bg-[#232720] p-4 space-y-3">
      <div className="flex items-center justify-between font-pixel text-[10px] text-[#ffaa00]">
        <span>GRILLHOUSE PLATFORM</span>
        <span>REST API + MYSQL</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Menu Search", "Cart Orders", "Reservations"].map((item) => (
          <div key={item} className="hotbar-slot p-2 text-center font-pixel text-[9px] text-[#e2dfd5]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
