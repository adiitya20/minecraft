"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/motion";

export function CareerObjective() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.from(".objective-box", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="objective" ref={root} className="site-pad py-[10vh] bg-[#121410]">
      <div className="objective-box mc-box-gold p-6 sm:p-10">
        <div className="section-kicker text-[#ffaa00]">QUEST OBJECTIVE</div>
        <p className="font-vt323 text-[clamp(1.5rem,3vw,2.5rem)] text-[#e2dfd5] mt-4 leading-relaxed">
          &ldquo;{portfolioData.objective}&rdquo;
        </p>
      </div>
    </section>
  );
}
