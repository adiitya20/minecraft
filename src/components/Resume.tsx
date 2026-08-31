"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { playClick, playItemHover } from "@/lib/mcSound";

export function Resume() {
  const [open, setOpen] = useState(false);
  const { personal, resume, education, leadership, skills } = portfolioData;

  const printResume = () => {
    playClick();
    window.print();
  };

  return (
    <section id="resume" className="site-pad py-[12vh] bg-[#121410]">
      <div className="section-kicker">Player Scroll</div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-pixel text-[clamp(1.8rem,4vw,3.5rem)] text-[#ffaa00] tracking-wide drop-shadow-[0_4px_0_#000]">
          📜 RÉSUMÉ MAP
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="font-pixel text-xs text-[#ffffff] bg-[#55a828] hover:bg-[#7cbd38] border-3 border-[#000] px-5 py-3 shadow-[inset_-3px_-3px_0_#2b4d13,inset_3px_3px_0_#8de84e]"
            onClick={() => {
              playClick();
              setOpen((v) => !v);
            }}
            onMouseEnter={playItemHover}
          >
            {open ? "[ HIDE SCROLL ]" : "[ READ SCROLL ]"}
          </button>

          <a
            href={resume.url}
            download
            className="font-pixel text-xs text-[#ffaa00] bg-[#232720] hover:bg-[#32382e] border-3 border-[#000] px-5 py-3 shadow-[inset_-3px_-3px_0_#121410,inset_3px_3px_0_#464f40] flex items-center gap-2"
            onClick={playClick}
            onMouseEnter={playItemHover}
          >
            <span>📥</span>
            <span>DOWNLOAD PDF</span>
          </a>
        </div>
      </div>

      {open && (
        <div className="mt-8 mc-box p-6 sm:p-10 bg-[#1b1e19]">
          <div className="flex justify-between items-center border-b-4 border-[#000] pb-4 mb-6">
            <div>
              <p className="font-pixel text-lg text-[#ffaa00]">{personal.name}</p>
              <p className="font-vt323 text-lg text-[#55ffff]">{personal.role} • {personal.degree}</p>
            </div>
            <button
              type="button"
              className="font-pixel text-[10px] text-[#ffffff] bg-[#000] px-3 py-1.5 border border-[#fff]"
              onClick={printResume}
            >
              PRINT
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 font-vt323 text-xl text-[#e2dfd5]">
            <div>
              <p className="font-pixel text-xs text-[#55ff55] mb-2">EDUCATION</p>
              {education.map((item) => (
                <div key={item.id} className="mb-3 bg-[#141612] p-3 border-2 border-[#000]">
                  <p className="font-pixel text-xs text-[#ffaa00]">{item.institution}</p>
                  <p className="text-[#a8a499]">{item.degree} • {item.score}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="font-pixel text-xs text-[#55ff55] mb-2">LEADERSHIP & SKILLS</p>
              <div className="bg-[#141612] p-3 border-2 border-[#000] mb-3">
                <p className="font-pixel text-xs text-[#ffaa00]">{leadership[0].event}</p>
                <p className="text-[#a8a499]">{leadership[0].role}</p>
              </div>

              <p className="font-pixel text-xs text-[#55ff55] mt-4 mb-2">PRIMARY TECH</p>
              <p className="font-pixel text-xs text-[#e2dfd5]">
                {skills.programming.join(" • ")}
              </p>
              <p className="font-vt323 text-lg text-[#888] mt-2">
                {skills.web.join(" • ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
