"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { useExperience } from "@/context/ExperienceContext";
import { scrollToId } from "@/lib/useLenis";
import { cn } from "@/lib/cn";
import { playClick, playItemHover, playPortalTravel, toggleSound, isSoundMuted } from "@/lib/mcSound";

const hotbarIcons: Record<string, { icon: string; subtitle: string }> = {
  about: { icon: "👤", subtitle: "Player Profile" },
  skills: { icon: "⚔️", subtitle: "Inventory System" },
  projects: { icon: "⛏️", subtitle: "Crafting Table" },
  education: { icon: "📦", subtitle: "World Map Path" },
  contact: { icon: "💎", subtitle: "Nether Portal" },
};

export function Navbar() {
  const { loaded, activeSection, closeProject, activeProject } = useExperience();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(() => isSoundMuted());
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last.current + 12 && y > 120) setHidden(true);
      else if (y < last.current - 8) setHidden(false);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    gsap.fromTo(
      ".nav-root",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 },
    );
  }, [loaded]);

  const go = (id: string) => {
    playClick();
    if (id === "contact") {
      playPortalTravel();
    }
    setOpen(false);
    if (activeProject) closeProject();
    scrollToId(id);
  };

  const handleToggleSound = () => {
    const isMutedNow = toggleSound();
    setMuted(isMutedNow);
  };

  return (
    <header
      className={cn(
        "nav-root fixed inset-x-0 top-0 z-50 px-[var(--pad)] pt-4 transition-transform duration-500",
        hidden && !open ? "-translate-y-[120%]" : "translate-y-0",
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between">
        {/* Minecraft Player Name Badge */}
        <button
          type="button"
          className="font-pixel text-[11px] text-[#ffaa00] bg-[#1a1d17] border-2 border-[#000] px-3 py-2 shadow-[inset_-2px_-2px_0_#0f110d,inset_2px_2px_0_#343a2d] hover:text-[#ffffff] transition-colors flex items-center gap-2"
          onClick={() => go("hero")}
          onMouseEnter={playItemHover}
        >
          <span className="h-2 w-2 bg-[#55ff55] animate-pulse" />
          <span>{portfolioData.personal.name}</span>
        </button>

        {/* Minecraft Hotbar Slots (Desktop) */}
        <div className="relative hidden lg:block">
          <ul className="flex items-center gap-1.5 bg-[#141612] p-1.5 border-4 border-[#000] shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
            {portfolioData.nav.map((item, index) => {
              const isActive = activeSection === item.id;
              const meta = hotbarIcons[item.id] || { icon: "📜", subtitle: item.label };

              return (
                <li key={item.id} className="relative">
                  <button
                    type="button"
                    className={cn(
                      "hotbar-slot relative flex flex-col items-center justify-center px-4 py-2 text-center transition-all",
                      isActive && "hotbar-active bg-[#353d2d]",
                    )}
                    onClick={() => go(item.id)}
                    onMouseEnter={() => {
                      playItemHover();
                      setActiveHover(item.id);
                    }}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    <span className="mono text-[9px] text-[#888] absolute top-1 left-1.5">
                      {index + 1}
                    </span>
                    <span className="text-lg leading-none mt-1">{meta.icon}</span>
                    <span className="font-pixel text-[9px] uppercase tracking-wider text-[#e2dfd5] mt-1">
                      {item.label}
                    </span>
                  </button>

                  {/* Hover Minecraft Tooltip */}
                  {activeHover === item.id && (
                    <div className="mc-tooltip absolute left-1/2 -bottom-14 -translate-x-1/2 z-50 whitespace-nowrap pointer-events-none">
                      <p className="font-pixel text-[10px] text-[#ffaa00]">{item.label}</p>
                      <p className="font-vt323 text-xs text-[#a8a499]">{meta.subtitle}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sound Toggle Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="font-pixel text-[10px] bg-[#1a1d17] border-2 border-[#000] px-3 py-2 text-[#ffaa00] shadow-[inset_-2px_-2px_0_#0f110d,inset_2px_2px_0_#343a2d] hover:bg-[#2c3227] flex items-center gap-2"
            onClick={handleToggleSound}
            title={muted ? "Enable Minecraft Sounds" : "Mute Sounds"}
          >
            <span>{muted ? "🔇" : "🔊"}</span>
            <span className="hidden sm:inline">{muted ? "SOUND OFF" : "SOUND ON"}</span>
          </button>

          <button
            type="button"
            className="font-pixel text-[10px] text-[#e2dfd5] bg-[#1a1d17] border-2 border-[#000] px-3 py-2 lg:hidden"
            aria-expanded={open}
            onClick={() => {
              playClick();
              setOpen((v) => !v);
            }}
          >
            {open ? "CLOSE" : "HOTBAR"}
          </button>
        </div>
      </nav>

      {/* Mobile Hotbar Dropdown */}
      {open ? (
        <div className="mt-3 border-4 border-[#000] bg-[#141612] p-4 lg:hidden shadow-2xl">
          <p className="font-pixel text-[10px] text-[#ffaa00] mb-3 uppercase">
            Select Inventory Item
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {portfolioData.nav.map((item) => {
              const meta = hotbarIcons[item.id] || { icon: "📜", subtitle: item.label };
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className="hotbar-slot w-full p-3 flex items-center gap-3 text-left"
                    onClick={() => go(item.id)}
                  >
                    <span className="text-xl">{meta.icon}</span>
                    <div>
                      <p className="font-pixel text-[10px] text-[#e2dfd5]">{item.label}</p>
                      <p className="font-vt323 text-xs text-[#888]">{meta.subtitle}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
