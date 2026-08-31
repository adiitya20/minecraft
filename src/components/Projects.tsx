"use client";

import { ProjectShowcase } from "./projects/ProjectShowcase";

export function Projects() {
  return (
    <section id="projects" className="relative py-[14vh] bg-[#161814]">
      <div className="site-pad mb-8">
        <div className="section-kicker">Crafting Bench</div>
        <h2 className="font-pixel text-[clamp(1.8rem,4vw,3.5rem)] text-[#ffaa00] mt-3 tracking-wide drop-shadow-[0_4px_0_#000]">
          CRAFTING TABLE
        </h2>
        <p className="font-vt323 text-xl text-[#a8a499] mt-2 max-w-2xl leading-relaxed">
          Combine ingredients (technologies, models, databases) in the 3x3 matrix to craft full-stack systems and intelligent solutions.
        </p>
      </div>
      <ProjectShowcase />
    </section>
  );
}
