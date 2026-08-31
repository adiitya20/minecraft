"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { playAchievement, playItemHover } from "@/lib/mcSound";

type AchievementItem = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  tag: string;
};

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "started",
    icon: "🏆",
    title: "Getting Started",
    subtitle: "Started my information technology and development journey.",
    tag: "MILESTONE",
  },
  {
    id: "diamond",
    icon: "💎",
    title: "Diamond Developer",
    subtitle: "Built advanced full-stack & AI projects with high precision.",
    tag: "RARE ACHIEVE",
  },
  {
    id: "redstone",
    icon: "⚙️",
    title: "Redstone Engineer",
    subtitle: "Designed complex database architectures and data pipelines.",
    tag: "SYSTEMS",
  },
  {
    id: "ai",
    icon: "🤖",
    title: "Artificial Intelligence",
    subtitle: "Trained & deployed computer vision and deepfake models.",
    tag: "AI / ML",
  },
  {
    id: "web",
    icon: "🌐",
    title: "Into the Web",
    subtitle: "Crafted multi-tier web apps with Node.js, Express & MySQL.",
    tag: "FULL STACK",
  },
];

export function Achievements() {
  const root = useRef<HTMLElement>(null);
  const [activeToast, setActiveToast] = useState<AchievementItem | null>(null);
  const unlockedSet = useRef(new Set<string>());

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".achievement-card");
      items.forEach((item, idx) => {
        const ach = ACHIEVEMENTS[idx];
        gsap.from(item, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            onEnter: () => {
              if (!unlockedSet.current.has(ach.id)) {
                unlockedSet.current.add(ach.id);
                setActiveToast(ach);
                playAchievement();
                setTimeout(() => setActiveToast(null), 3500);
              }
            },
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={root} className="site-pad relative py-[12vh] bg-[#161814]">
      {/* Toast Notification (Top Right Popup) */}
      {activeToast && (
        <div className="fixed top-20 right-6 z-[90] mc-tooltip flex items-center gap-4 animate-bounce max-w-sm">
          <span className="text-3xl">{activeToast.icon}</span>
          <div>
            <p className="font-pixel text-[9px] text-[#55ff55]">ACHIEVEMENT UNLOCKED!</p>
            <p className="font-pixel text-xs text-[#ffaa00] mt-0.5">{activeToast.title}</p>
            <p className="font-vt323 text-sm text-[#e2dfd5] line-clamp-1">{activeToast.subtitle}</p>
          </div>
        </div>
      )}

      <div className="section-kicker">Player Badges</div>
      <h2 className="font-pixel text-[clamp(1.8rem,4vw,3.5rem)] text-[#ffaa00] mt-3 tracking-wide drop-shadow-[0_4px_0_#000]">
        ACHIEVEMENTS UNLOCKED
      </h2>
      <p className="font-vt323 text-xl text-[#a8a499] mt-2 max-w-xl">
        Every milestone in my software development quest awards a unique trophy.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((item) => (
          <div
            key={item.id}
            className="achievement-card mc-box-gold p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer"
            onMouseEnter={playItemHover}
          >
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#000] pb-3 mb-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="font-pixel text-[9px] text-[#55ff55] bg-[#000] px-2 py-1 border border-[#55ff55]/40">
                  {item.tag}
                </span>
              </div>

              <h3 className="font-pixel text-sm text-[#ffffff]">{item.title}</h3>
              <p className="font-vt323 text-lg text-[#a8a499] mt-2 leading-snug">
                {item.subtitle}
              </p>
            </div>

            <div className="mt-4 font-pixel text-[9px] text-[#ffaa00] flex items-center gap-1.5">
              <span>✔</span>
              <span>UNLOCKED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
