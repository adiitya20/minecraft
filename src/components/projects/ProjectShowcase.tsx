"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useMedia";

export function ProjectShowcase() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    registerGsap();
    const pinEl = pin.current;
    const trackEl = track.current;
    if (!pinEl || !trackEl) return;
    if (!desktop || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".project-slide");
      const tween = gsap.to(trackEl, {
        x: () => -(trackEl.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: () => `+=${trackEl.scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(
              slides.length - 1,
              Math.round(self.progress * (slides.length - 1)),
            );
            setIndex(next);
          },
        },
      });
      void tween;
    }, pinEl);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [desktop]);

  return (
    <div ref={pin} className="relative overflow-hidden">
      <div
        ref={track}
        className={
          desktop
            ? "flex w-max"
            : "flex flex-col"
        }
      >
        {portfolioData.projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            active={desktop ? index === i : true}
          />
        ))}
      </div>
    </div>
  );
}
