"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { portfolioData, projectSkillMap } from "@/data/portfolio";
import { SkillCategory } from "./skills/SkillCategory";
import { prefersReducedMotion } from "@/lib/motion";

export function Skills() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const related = useMemo(() => {
    const set = new Set<string>();
    if (!active) return set;
    set.add(active);
    (portfolioData.skillRelations[active] ?? []).forEach((item) => set.add(item));
    return set;
  }, [active]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.from(".skill-chest-grid", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={root} className="site-pad relative py-[14vh] bg-[#121410]">
      <div className="section-kicker">Chest Inventory</div>
      <h2 className="font-pixel text-[clamp(1.8rem,4vw,3.5rem)] text-[#ffaa00] mt-3 tracking-wide drop-shadow-[0_4px_0_#000]">
        TECHNICAL INVENTORY
      </h2>
      <p className="font-vt323 text-xl text-[#a8a499] mt-2 max-w-xl">
        Hover an item slot to view stats, descriptions, and connected tools in your crafting menu.
      </p>

      {/* Minecraft Inventory Chest Container */}
      <div className="mt-10 mc-box p-6 sm:p-8 bg-[#1e221a]">
        {/* Chest Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b-4 border-[#000] pb-4 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📦</span>
            <span className="font-pixel text-xs text-[#ffffff]">MINECRAFT CHEST INVENTORY</span>
          </div>

          {/* Active Item Tooltip readout */}
          {active ? (
            <div className="mc-tooltip flex items-center gap-3">
              <span className="font-pixel text-xs text-[#ffaa00]">{active}</span>
              {portfolioData.skillNotes[active] ? (
                <span className="font-vt323 text-sm text-[#55ffff]">
                  — {portfolioData.skillNotes[active]}
                </span>
              ) : (
                <span className="font-vt323 text-xs text-[#888]">★ Legendary Tool</span>
              )}
            </div>
          ) : (
            <div className="font-pixel text-[10px] text-[#888] bg-[#000]/60 px-3 py-1.5 border border-[#444]">
              HOVER AN ITEM SLOT TO INSPECT
            </div>
          )}
        </div>

        {/* 9x3 Skill Category Inventory Grid */}
        <div className="skill-chest-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioData.skillCategories.map((category) => (
            <SkillCategory
              key={category.id}
              label={category.label}
              skills={portfolioData.skills[category.id]}
              active={active}
              related={related}
              onEnter={setActive}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>

        {/* Project Crafting Recipe Map */}
        <div className="mt-12 pt-8 border-t-4 border-[#000]">
          <p className="font-pixel text-xs text-[#ffaa00] mb-4">
            ⚒️ CRAFTED SYSTEMS INVENTORY
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {portfolioData.projects.map((project) => (
              <div key={project.slug} className="mc-box-gold p-4">
                <p className="font-pixel text-[10px] text-[#ffaa00]">
                  SLOT {project.number}
                </p>
                <p className="font-pixel text-xs text-[#ffffff] mt-1">{project.title}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {(projectSkillMap[project.slug] ?? []).map((skill) => (
                    <li
                      key={skill}
                      className="font-pixel text-[8px] text-[#55ffff] bg-[#000] border border-[#55ffff]/40 px-2 py-1"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
