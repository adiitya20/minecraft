"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { playClick, playItemHover } from "@/lib/mcSound";

export function Leadership() {
  const [open, setOpen] = useState(false);
  const entry = portfolioData.leadership[0];

  return (
    <section id="leadership" className="site-pad py-[10vh] bg-[#161814]">
      <div className="mc-box-gold p-6 sm:p-8">
        <div className="section-kicker">Guild Leadership</div>
        <button
          type="button"
          className="mt-4 flex w-full items-start justify-between gap-6 text-left cursor-pointer"
          aria-expanded={open}
          onClick={() => {
            playClick();
            setOpen((v) => !v);
          }}
          onMouseEnter={playItemHover}
        >
          <div>
            <h2 className="font-pixel text-[clamp(1.4rem,3.5vw,2.8rem)] text-[#ffaa00] leading-snug">
              🏰 {entry.event}
            </h2>
            <p className="font-pixel text-[10px] text-[#55ffff] mt-2">
              {entry.type.toUpperCase()} • {entry.organization}
            </p>
          </div>
          <span className="font-pixel text-xs text-[#ffffff] bg-[#000] px-3 py-2 border-2 border-[#ffaa00]">
            {open ? "[ CLOSE ]" : "[ VIEW ROLE ]"}
          </span>
        </button>

        {open && (
          <div className="mt-6 border-t-2 border-[#000] pt-6 font-vt323 text-xl text-[#e2dfd5] space-y-2">
            <p className="font-pixel text-xs text-[#55ff55]">LEADERSHIP POSITION:</p>
            <p className="font-pixel text-lg text-[#ffffff]">{entry.role}</p>
            <p className="text-[#888]">
              Managed festival finances, budgeting, sponsor allocations, and financial ops for Techyon at PCCE.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
