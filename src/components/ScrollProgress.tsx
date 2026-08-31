"use client";

import { useEffect, useMemo, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { useExperience } from "@/context/ExperienceContext";
import { cn } from "@/lib/cn";
import { registerGsap } from "@/lib/motion";
import { scrollToId } from "@/lib/useLenis";

export function ScrollProgress() {
  const { activeSection, setActiveSection, loaded } = useExperience();
  const bar = useRef<HTMLDivElement>(null);

  const map = useMemo(
    () =>
      portfolioData.progress.map((item) => ({
        ...item,
        section:
          item.target === "hero"
            ? "intro"
            : item.target === "skills"
              ? "skills"
              : item.target === "projects"
                ? "projects"
                : item.target === "education"
                  ? "education"
                  : "contact",
      })),
    [],
  );

  useEffect(() => {
    if (!loaded) return;
    registerGsap();
    const triggers = portfolioData.progress.map((item) =>
      ScrollTrigger.create({
        trigger: `#${item.target}`,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => setActiveSection(item.id === "intro" ? "about" : item.id),
        onEnterBack: () => setActiveSection(item.id === "intro" ? "about" : item.id),
      }),
    );

    const hero = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom 40%",
      onEnter: () => setActiveSection("intro"),
      onEnterBack: () => setActiveSection("intro"),
    });

    const about = ScrollTrigger.create({
      trigger: "#about",
      start: "top 40%",
      end: "bottom 40%",
      onToggle: (self) => {
        if (self.isActive) setActiveSection("about");
      },
    });

    const onUpdate = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
    };
    onUpdate();
    window.addEventListener("scroll", onUpdate, { passive: true });

    return () => {
      triggers.forEach((t) => t.kill());
      hero.kill();
      about.kill();
      window.removeEventListener("scroll", onUpdate);
    };
  }, [loaded, setActiveSection]);

  return (
    <aside className="pointer-events-none fixed right-[var(--pad)] top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="pointer-events-auto flex items-start gap-4">
        <ol className="space-y-3 text-right">
          {map.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToId(item.target)}
                className={cn(
                  "mono text-[10px] tracking-[0.18em] uppercase transition-opacity",
                  activeSection === item.id ||
                    (item.id === "intro" && activeSection === "intro")
                    ? "opacity-100"
                    : "opacity-35 hover:opacity-80",
                )}
              >
                {String(index + 1).padStart(2, "0")} {item.label}
              </button>
            </li>
          ))}
        </ol>
        <div className="relative h-28 w-px bg-[var(--line)]">
          <div
            ref={bar}
            className="absolute left-0 top-0 h-full w-full origin-top bg-[var(--ink)]"
            style={{ transform: "scaleY(0)" }}
          />
        </div>
      </div>
    </aside>
  );
}
