"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { playItemHover } from "@/lib/mcSound";

const LOCATION_ICONS: Record<string, string> = {
  pcce: "🏠",
  hss: "📚",
  ssc: "🏫",
};

export function EducationTimeline() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".rail-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 20%", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={root} className="site-pad relative py-[14vh] bg-[#121410]">
      <div className="section-kicker">World Waypoints</div>
      <h2 className="font-pixel text-[clamp(1.8rem,4vw,3.5rem)] text-[#ffaa00] mt-3 tracking-wide drop-shadow-[0_4px_0_#000]">
        WORLD MAP JOURNEY
      </h2>
      <p className="font-vt323 text-xl text-[#a8a499] mt-2 max-w-xl">
        Travel along the minecart rail line to view educational milestones and achievements.
      </p>

      <div className="relative mt-12">
        {/* Redstone Minecart Rail Track */}
        <div className="rail-line absolute left-6 top-0 h-full w-2 origin-top bg-[#ff3300] shadow-[0_0_12px_#ff3300] md:left-1/2 md:-translate-x-1/2" />

        <ol className="space-y-12">
          {portfolioData.education.map((item, index) => {
            const icon = LOCATION_ICONS[item.id] || "📍";

            return (
              <li
                key={item.id}
                className={cn(
                  "relative grid gap-6 md:grid-cols-2 items-center",
                  index % 2 === 1 && "md:[&>*:first-child]:col-start-2",
                )}
                onMouseEnter={playItemHover}
              >
                {/* Waypoint Icon Frame */}
                <div
                  className={cn(
                    "absolute left-6 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center font-pixel text-lg border-2 border-[#000] bg-[#1e221a] text-[#ffaa00] shadow-[0_0_10px_rgba(0,0,0,0.8)] md:left-1/2",
                    item.current && "bg-[#55a828] text-[#ffffff] border-[#ffffff] shadow-[0_0_14px_#55ff55]",
                  )}
                >
                  {icon}
                </div>

                {/* Content Box */}
                <div
                  className={cn(
                    "pl-16 md:pl-0",
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12",
                  )}
                >
                  <div className="mc-box p-6 bg-[#1b1e19]">
                    <div className="flex flex-wrap items-center gap-2 font-pixel text-[10px] text-[#ffaa00] justify-start md:justify-inherit mb-2">
                      <span className="bg-[#000] px-2 py-1 border border-[#ffaa00]/40">
                        {item.status.toUpperCase()}
                      </span>
                      {item.current && (
                        <span className="bg-[#55a828] text-[#fff] px-2 py-1">CURRENT WAYPOINT</span>
                      )}
                    </div>

                    <h3 className="font-pixel text-base text-[#ffffff] leading-snug">
                      {item.institution}
                    </h3>

                    {item.degree && (
                      <p className="font-vt323 text-xl text-[#55ffff] mt-1">{item.degree}</p>
                    )}

                    <div className="font-pixel text-[10px] text-[#888] mt-3">
                      {item.period}
                    </div>

                    <div className="font-pixel text-lg text-[#55ff55] mt-3">
                      {item.scoreLabel}: {item.score}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
