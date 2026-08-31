"use client";

import { useEffect, useRef, useState } from "react";
import { useExperience } from "@/context/ExperienceContext";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/useMedia";
import { cn } from "@/lib/cn";

export function CustomCursor() {
  const pickaxeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const { cursorMode } = useExperience();
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  const [isHitting, setIsHitting] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; vx: number; vy: number; color: string }[]>([]);

  useEffect(() => {
    if (touch || reduced) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }
    document.documentElement.classList.add("has-custom-cursor");

    // ZERO-LAG 1:1 Mouse Position Tracking
    const onMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      if (pickaxeRef.current) {
        // Direct translate3d for hardware accelerated ZERO LAG tracking
        pickaxeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${x + 22}px, ${y + 22}px, 0px)`;
      }
    };

    // Minecraft Mining Hit Animation on Click
    const onMouseDown = (event: MouseEvent) => {
      setIsHitting(true);

      // Spawn mining block break particles at exact cursor tip
      const newParticles: { id: number; x: number; y: number; vx: number; vy: number; color: string }[] = [];
      const colors = ["#55ffff", "#a7f5ec", "#239488", "#866043", "#573d26", "#ffffff"];
      for (let i = 0; i < 6; i++) {
        newParticles.push({
          id: Math.random(),
          x: event.clientX,
          y: event.clientY,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.8) * 12,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
      }, 350);
    };

    const onMouseUp = () => {
      setIsHitting(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [touch, reduced]);

  if (touch || reduced) return null;

  const isHover = cursorMode !== "default";

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden lg:block overflow-hidden" aria-hidden>
      {/* Block Mining Break Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 border border-[#000] pointer-events-none z-[105]"
          style={{
            left: p.x,
            top: p.y,
            backgroundColor: p.color,
            transform: `translate3d(${p.vx * 3}px, ${p.vy * 3}px, 0)`,
            transition: "transform 0.35s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.35s ease-out",
            opacity: 0.9,
          }}
        />
      ))}

      {/* Zero-Lag Minecraft Diamond Pickaxe Cursor Element */}
      <div
        ref={pickaxeRef}
        className="absolute left-0 top-0 will-change-transform pointer-events-none"
        style={{
          // Hotspot tip alignment: top left point of pickaxe head at (0,0)
          marginLeft: "-4px",
          marginTop: "-4px",
        }}
      >
        <div
          className={cn(
            "transition-transform duration-75 ease-out origin-[4px_4px]",
            isHitting ? "rotate-[30deg] scale-110" : isHover ? "-rotate-[30deg] scale-110" : "-rotate-[15deg]",
          )}
          style={{
            filter: isHover
              ? "drop-shadow(0 0 8px #55ffff) drop-shadow(0 0 16px #55ffff)"
              : "drop-shadow(0 2px 5px rgba(0,0,0,0.85))",
          }}
        >
          {/* Authentic 1:1 Pixelated Minecraft Diamond Pickaxe (Exact 16x16 Grid) */}
          <svg
            width="38"
            height="38"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
          >
            {/* Outline (Black 1px Grid Borders) */}
            <path
              d="M6 0h5v1h-5zM11 1h2v1h-2zM13 2h2v1h-2zM15 3h1v5h-1zM14 8h-1v2h1zM13 10h-1v1h1zM11 11h-1v1h1zM10 12h-1v1h1zM8 13h-1v1h1zM6 14h-1v1h1zM4 15h-2v1h2zM1 15h-1v-2h1zM2 13h1v-1h-1zM3 12h1v-1h-1zM4 11h1v-1h-1zM5 10h1v-1h-1zM6 8h1v-2h-1zM0 14h1v1h-1z"
              fill="#000000"
            />

            {/* Handle - Stick Pixels (Wood brown colors) */}
            <rect x="2" y="14" width="1" height="1" fill="#4a3219" />
            <rect x="3" y="13" width="1" height="1" fill="#866043" />
            <rect x="4" y="12" width="1" height="1" fill="#4a3219" />
            <rect x="5" y="11" width="1" height="1" fill="#866043" />
            <rect x="6" y="10" width="1" height="1" fill="#4a3219" />
            <rect x="7" y="9" width="1" height="1" fill="#866043" />
            <rect x="8" y="8" width="1" height="1" fill="#4a3219" />

            {/* Pickaxe Head Socket Iron Connection */}
            <rect x="9" y="7" width="1" height="1" fill="#866043" />
            <rect x="8" y="6" width="1" height="1" fill="#573d26" />

            {/* Diamond Pickaxe Head - Authentic Cyan & Teal Highlights */}
            {/* Top Light Highlights */}
            <rect x="7" y="1" width="4" height="1" fill="#a7f5ec" />
            <rect x="11" y="2" width="2" height="1" fill="#a7f5ec" />
            <rect x="6" y="1" width="1" height="3" fill="#a7f5ec" />

            {/* Diamond Main Body Fill */}
            <rect x="7" y="2" width="4" height="2" fill="#55ffff" />
            <rect x="11" y="3" width="3" height="2" fill="#55ffff" />
            <rect x="14" y="5" width="1" height="2" fill="#55ffff" />
            <rect x="6" y="4" width="2" height="2" fill="#55ffff" />
            <rect x="5" y="6" width="1" height="2" fill="#55ffff" />

            {/* Diamond Dark Contour Shading */}
            <rect x="7" y="4" width="2" height="2" fill="#239488" />
            <rect x="9" y="4" width="2" height="2" fill="#125656" />
            <rect x="11" y="5" width="2" height="2" fill="#125656" />
            <rect x="13" y="7" width="1" height="1" fill="#125656" />
            <rect x="5" y="8" width="1" height="1" fill="#125656" />
          </svg>
        </div>
      </div>

      {/* Tooltip Badge */}
      <div
        ref={labelRef}
        className={cn(
          "absolute left-0 top-0 font-pixel text-[9px] text-[#ffaa00] bg-[#100010] border-2 border-[#ffaa00] px-2 py-1 shadow-xl transition-opacity duration-150 flex items-center gap-1.5 pointer-events-none",
          isHover ? "opacity-100" : "opacity-0",
        )}
      >
        <span>⛏️</span>
        <span>{cursorMode === "view" ? "MINE" : cursorMode === "open" ? "CRAFT" : "HIT"}</span>
      </div>
    </div>
  );
}
