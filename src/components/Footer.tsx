import { portfolioData } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="site-pad border-t-4 border-[#000] bg-[#0c0d0a] py-8 text-center md:flex md:items-center md:justify-between">
      <div className="font-pixel text-[10px] text-[#ffaa00] flex items-center justify-center gap-2">
        <span>⬛ BEDROCK LEVEL</span>
        <span>•</span>
        <span>{portfolioData.personal.name.toUpperCase()}</span>
      </div>

      <p className="font-vt323 text-lg text-[#a8a499] mt-2 md:mt-0">
        Crafted with code, creativity & curiosity. © 2026 {portfolioData.personal.name}
      </p>

      <div className="font-pixel text-[9px] text-[#55ffff] mt-2 md:mt-0">
        {portfolioData.personal.location.toUpperCase()} • {portfolioData.personal.collegeShort}
      </div>
    </footer>
  );
}
