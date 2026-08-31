"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const moods = ["Calm", "Focused", "Upbeat"] as const;

const playlists: Record<(typeof moods)[number], string[]> = {
  Calm: ["Evening Air", "Low Tide Notes", "Quiet Room"],
  Focused: ["Deep Work Loop", "Clear Desk", "Signal Path"],
  Upbeat: ["Open Windows", "Sunlit Corridor", "Bright Interval"],
};

type Props = {
  active: boolean;
};

export function MoodDetectorVisualization({ active }: Props) {
  const [phase, setPhase] = useState<"idle" | "scan" | "mood" | "music">("idle");
  const [count, setCount] = useState(10);
  const mood = moods[1];

  useEffect(() => {
    if (!active) {
      const timer = setTimeout(() => {
        setPhase("idle");
        setCount(10);
      }, 0);
      return () => clearTimeout(timer);
    }
    
    let interval: number;
    const timer = setTimeout(() => {
      setPhase("scan");
      setCount(10);
      interval = window.setInterval(() => {
        setCount((value) => {
          if (value <= 1) {
            window.clearInterval(interval);
            setPhase("mood");
            window.setTimeout(() => setPhase("music"), 900);
            return 0;
          }
          return value - 1;
        });
      }, 1000);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (interval) window.clearInterval(interval);
    };
  }, [active]);

  return (
    <div className="relative overflow-hidden border border-[var(--line)] bg-[#1c1b18] text-[#f3efe6]">
      <div className="flex items-center justify-between px-4 py-3 mono text-[10px] tracking-[0.16em] uppercase">
        <span>Camera analysis</span>
        <span>Visualization only — camera is not accessed</span>
      </div>
      <div className="relative aspect-[16/10]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#3a342c,transparent_55%),#141311]" />
        <div className="scan-line absolute inset-x-8 top-[18%] h-px bg-[#f3efe6]/50" />
        <div
          className={cn(
            "absolute left-1/2 top-[22%] h-[48%] w-[32%] -translate-x-1/2 border border-[#f3efe6]/70",
            phase === "scan" && "animate-pulse",
          )}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" aria-hidden>
          <circle cx="50" cy="24" r="3" fill="none" stroke="#f3efe6" strokeOpacity="0.5" />
          <path d="M42 32 Q50 38 58 32" fill="none" stroke="#f3efe6" strokeOpacity="0.45" />
          <line x1="44" y1="22" x2="40" y2="20" stroke="#f3efe6" strokeOpacity="0.35" />
          <line x1="56" y1="22" x2="60" y2="20" stroke="#f3efe6" strokeOpacity="0.35" />
        </svg>
        <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#f3efe6]/40 display text-xl">
          {String(count).padStart(2, "0")}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          {phase === "scan" && (
            <p className="mono text-[11px] tracking-[0.16em] uppercase">Analyzing expression</p>
          )}
          {phase === "mood" && (
            <p className="display text-2xl tracking-[-0.04em]">Mood detected — {mood}</p>
          )}
          {phase === "music" && (
            <p className="mono text-[11px] tracking-[0.16em] uppercase">
              Generating music recommendations
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-px bg-[var(--line)] sm:grid-cols-3">
        {playlists[mood].map((item, index) => (
          <div
            key={item}
            className={cn(
              "bg-[#1c1b18] px-4 py-5 transition-all duration-700",
              phase === "music" ? "translate-y-0 opacity-100" : "translate-y-[#3px] opacity-0",
            )}
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <p className="mono text-[10px] tracking-[0.16em] uppercase opacity-50">
              Suggest {String(index + 1).padStart(2, "0")}
            </p>
            <p className="display mt-2 text-lg tracking-[-0.03em]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
