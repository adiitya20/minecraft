"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/motion";
import { playItemHover, playXp } from "@/lib/mcSound";

const STATS = [
  { label: "Coding XP", value: 80, color: "#55ff55" },
  { label: "Problem Solving", value: 90, color: "#55ffff" },
  { label: "Machine Learning", value: 70, color: "#ffaa00" },
  { label: "Web Development", value: 80, color: "#ff55ff" },
];

export function About() {
  const root = useRef<HTMLElement>(null);
  const { personal } = portfolioData;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        setAnimated(true);
        return;
      }

      gsap.from(".player-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          onEnter: () => {
            setAnimated(true);
            playXp();
          },
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="site-pad relative py-[14vh] bg-[#161814]">
      {/* Section Header */}
      <div className="section-kicker">Player Stats</div>
      <h2 className="font-pixel text-[clamp(1.8rem,4vw,3.5rem)] text-[#ffaa00] mt-3 tracking-wide drop-shadow-[0_4px_0_#000]">
        PLAYER PROFILE
      </h2>
      <p className="font-vt323 text-xl text-[#a8a499] mt-2 max-w-xl">
        Inspect character stats, attributes, and background story.
      </p>

      {/* Main Grid */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Left: Bio & Story */}
        <div className="mc-box p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-[#000] pb-4">
            <span className="font-pixel text-xs text-[#55ff55] bg-[#000]/60 px-3 py-1 border border-[#55ff55]/30">
              BIO & BACKGROUND
            </span>
          </div>

          <div className="space-y-4 font-vt323 text-xl text-[#e2dfd5] leading-relaxed">
            {personal.about.map((paragraph, i) => (
              <p key={i} className="bg-[#141612] p-4 border-2 border-[#000]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 font-pixel text-[10px] pt-2">
            <div className="bg-[#181b16] p-3 border-2 border-[#000]">
              <span className="text-[#888] block mb-1">DEGREE</span>
              <span className="text-[#55ffff]">{personal.degree}</span>
            </div>
            <div className="bg-[#181b16] p-3 border-2 border-[#000]">
              <span className="text-[#888] block mb-1">COLLEGE</span>
              <span className="text-[#ffaa00]">{personal.collegeShort}</span>
            </div>
            <div className="bg-[#181b16] p-3 border-2 border-[#000]">
              <span className="text-[#888] block mb-1">CGPA</span>
              <span className="text-[#55ff55]">{personal.cgpa}</span>
            </div>
            <div className="bg-[#181b16] p-3 border-2 border-[#000]">
              <span className="text-[#888] block mb-1">PERIOD</span>
              <span className="text-[#ffffff]">{personal.years}</span>
            </div>
          </div>
        </div>

        {/* Right: Character Card & XP Stat Bars */}
        <div className="player-card mc-box-gold p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#000] pb-4">
            <div>
              <p className="font-pixel text-xs text-[#ffaa00]">PLAYER</p>
              <p className="font-pixel text-sm text-[#ffffff] mt-1">{personal.name}</p>
            </div>
            <div className="font-pixel text-xs text-[#55ff55] bg-[#000] px-3 py-1.5 border border-[#55ff55]/50">
              LVL 8.7
            </div>
          </div>

          <div className="space-y-2 font-pixel text-[10px]">
            <div className="flex justify-between text-[#888]">
              <span>CLASS</span>
              <span className="text-[#55ffff]">{personal.role}</span>
            </div>
            <div className="flex justify-between text-[#888]">
              <span>LOCATION</span>
              <span className="text-[#ffffff]">{personal.location}</span>
            </div>
          </div>

          {/* Animated Minecraft XP Stat Bars */}
          <div className="space-y-5 pt-4">
            <p className="font-pixel text-xs text-[#ffaa00] flex items-center gap-2">
              <span>⚡</span>
              <span>SKILL XP ATTRIBUTES</span>
            </p>

            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="space-y-1.5"
                onMouseEnter={playItemHover}
              >
                <div className="flex justify-between font-pixel text-[10px]">
                  <span className="text-[#e2dfd5]">{stat.label}</span>
                  <span style={{ color: stat.color }}>{stat.value}%</span>
                </div>
                <div className="xp-bar-bg">
                  <div
                    className="xp-bar-fill"
                    style={{
                      width: animated ? `${stat.value}%` : "0%",
                      backgroundColor: stat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
