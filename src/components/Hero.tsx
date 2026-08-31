"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { useExperience } from "@/context/ExperienceContext";
import { HeroBackground } from "./HeroBackground";
import { prefersReducedMotion } from "@/lib/motion";
import { scrollToId } from "@/lib/useLenis";
import { playClick, playItemHover, playPortalTravel } from "@/lib/mcSound";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { loaded } = useExperience();

  useEffect(() => {
    if (!loaded || !root.current) return;
    const reduced = prefersReducedMotion();
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-mc-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".hero-mc-badge", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }, root);

    return () => ctx.revert();
  }, [loaded]);

  const { personal } = portfolioData;

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-12 pt-[100px]"
    >
      <HeroBackground />

      {/* Top Info Bar */}
      <div className="site-pad relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="hero-mc-badge font-pixel text-[10px] text-[#ffaa00] bg-[#1a1d17]/90 border-2 border-[#000] px-3 py-1.5 shadow-[inset_-2px_-2px_0_#0f110d] flex items-center gap-2">
          <span>📍</span>
          <span>{personal.location.toUpperCase()}</span>
        </div>

        <div className="hero-mc-badge font-pixel text-[10px] text-[#55ffff] bg-[#1a1d17]/90 border-2 border-[#000] px-3 py-1.5 shadow-[inset_-2px_-2px_0_#0f110d] flex items-center gap-2">
          <span>🎓</span>
          <span>{personal.collegeShort} • {personal.degree}</span>
        </div>

        <div className="hero-mc-badge font-pixel text-[10px] text-[#55ff55] bg-[#1a1d17]/90 border-2 border-[#000] px-3 py-1.5 shadow-[inset_-2px_-2px_0_#0f110d] flex items-center gap-2">
          <span>⭐</span>
          <span>CGPA {personal.cgpa}</span>
        </div>
      </div>

      {/* Hero Content Main Grid */}
      <div className="site-pad relative z-10 mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <div className="inline-block font-pixel text-xs text-[#55ff55] bg-[#000]/60 px-3 py-1.5 border-2 border-[#55ff55]/40 mb-4">
            Hi, I&apos;m Aditya 👋
          </div>

          <h1 className="hero-mc-title font-pixel text-[clamp(2.2rem,6vw,5.5rem)] text-[#ffffff] leading-[1.1] tracking-wide drop-shadow-[0_6px_0_#000000]">
            <span className="block text-[#ffaa00]">{personal.firstName.toUpperCase()}</span>
            <span className="block text-[#ffffff]">{personal.lastName.toUpperCase()}</span>
          </h1>

          <p className="font-pixel text-xs sm:text-sm text-[#55ffff] mt-6 tracking-widest leading-relaxed border-l-4 border-[#ffaa00] pl-4 py-1">
            DEVELOPER • AI/ML ENTHUSIAST • PROBLEM SOLVER
          </p>

          <p className="mt-6 max-w-xl font-vt323 text-xl text-[#a8a499] leading-normal bg-[#141612]/80 border-2 border-[#000] p-4">
            {personal.heroSummary}
          </p>

          {/* Enchanted CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              className="enchanted-glow font-pixel text-xs text-[#ffffff] bg-[#55a828] hover:bg-[#7cbd38] border-3 border-[#000] px-6 py-3.5 shadow-[inset_-3px_-3px_0_#2b4d13,inset_3px_3px_0_#8de84e] flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              onClick={() => {
                playClick();
                scrollToId("projects");
              }}
              onMouseEnter={playItemHover}
            >
              <span>⛏️</span>
              <span>CRAFTED PROJECTS</span>
            </button>

            <button
              type="button"
              className="font-pixel text-xs text-[#ffaa00] bg-[#232720] hover:bg-[#32382e] border-3 border-[#000] px-6 py-3.5 shadow-[inset_-3px_-3px_0_#121410,inset_3px_3px_0_#464f40] flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              onClick={() => {
                playClick();
                playPortalTravel();
                scrollToId("contact");
              }}
              onMouseEnter={playItemHover}
            >
              <span>💎</span>
              <span>ENTER NETHER (CONTACT)</span>
            </button>
          </div>
        </div>

        {/* Right Side: Minecraft Block Developer Avatar */}
        <div className="flex justify-center">
          <div className="mc-box p-6 relative max-w-sm w-full flex flex-col items-center text-center">
            {/* Minecraft Character Head */}
            <div className="relative w-36 h-36 border-4 border-[#000] bg-[#3a271d] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Hair */}
              <div className="absolute top-0 inset-x-0 h-10 bg-[#1f1510]" />
              {/* Face Skin */}
              <div className="absolute top-8 inset-x-2 bottom-2 bg-[#d69e6e]" />
              {/* Eyes */}
              <div className="absolute top-14 left-4 w-6 h-4 bg-[#ffffff] border border-[#000] flex items-center justify-end">
                <div className="w-3 h-4 bg-[#2b59a6]" />
              </div>
              <div className="absolute top-14 right-4 w-6 h-4 bg-[#ffffff] border border-[#000] flex items-center justify-start">
                <div className="w-3 h-4 bg-[#2b59a6]" />
              </div>
              {/* Mouth */}
              <div className="absolute bottom-6 left-12 w-12 h-2 bg-[#70462e]" />
            </div>

            <div className="mt-4 font-pixel text-xs text-[#ffaa00]">
              [ PLAYER : ADITYA ]
            </div>
            <div className="font-vt323 text-base text-[#55ffff]">
              Level 4 Developer • IT Student
            </div>

            {/* Inventory Quick Slot bar under avatar */}
            <div className="mt-4 flex gap-2">
              {["🐍", "⚙️", "☕", "⚡", "🤖"].map((icon, idx) => (
                <div key={idx} className="hotbar-slot w-9 h-9 flex items-center justify-center text-sm">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
