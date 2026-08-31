"use client";

import { playItemHover } from "@/lib/mcSound";
import { cn } from "@/lib/cn";

const SKILL_ICONS: Record<string, string> = {
  Python: "🐍",
  C: "⚙️",
  "C++": "⚙️",
  Java: "☕",
  JavaScript: "⚡",
  SQL: "🗄️",
  HTML5: "🧱",
  CSS3: "🎨",
  "Tailwind CSS": "🌊",
  "Node.js": "🟢",
  "Express.js": "🚀",
  MySQL: "🐬",
  MongoDB: "🍃",
  SQLite: "📦",
  Oracle: "🏛️",
  "Machine Learning": "🤖",
  "Deep Learning": "🧠",
  "Computer Vision": "👁️",
  TensorFlow: "🔥",
  OpenCV: "📷",
  Librosa: "🎵",
  CNN: "🕸️",
  LSTM: "🔄",
  "Data Analysis": "📊",
  "Data Visualization": "📈",
  Tableau: "🖼️",
  Excel: "📑",
  Git: "📦",
  GitHub: "🐙",
  "VS Code": "💻",
  Figma: "📐",
};

type Props = {
  label: string;
  skills: readonly string[];
  active: string | null;
  related: Set<string>;
  onEnter: (skill: string) => void;
  onLeave: () => void;
};

export function SkillCategory({
  label,
  skills,
  active,
  related,
  onEnter,
  onLeave,
}: Props) {
  return (
    <div className="mc-box p-4 flex flex-col justify-between">
      <div className="flex items-center gap-2 border-b-2 border-[#000] pb-2 mb-3">
        <span className="font-pixel text-[10px] text-[#ffaa00]">{label.toUpperCase()}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {skills.map((skill) => {
          const isSelected = active === skill;
          const isRelated = related.has(skill);
          const icon = SKILL_ICONS[skill] || "🔮";

          return (
            <button
              key={skill}
              type="button"
              className={cn(
                "hotbar-slot p-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative group min-h-[64px]",
                isSelected && "hotbar-active bg-[#3a4430] border-[#55ffff]",
                isRelated && !isSelected && "border-[#ffaa00] bg-[#2a2d1e]",
              )}
              onMouseEnter={() => {
                playItemHover();
                onEnter(skill);
              }}
              onMouseLeave={onLeave}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
              <span className="font-pixel text-[9px] text-[#e2dfd5] mt-1 line-clamp-1">
                {skill}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
