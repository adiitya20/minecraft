"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { useExperience } from "@/context/ExperienceContext";
import { prefersReducedMotion } from "@/lib/motion";
import { playFuse, playExplosion, playClick, playItemHover, playLevelUp } from "@/lib/mcSound";

const TIPS = [
  "Tip: Great developers don't fear bugs.",
  "Tip: Keep mining until you find the solution.",
  "Tip: Every project starts with one block.",
  "Tip: Redstone & logic drive complex systems.",
  "Tip: Always craft modular, clean code.",
];

export function LoadingScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { loaded, setLoaded } = useExperience();

  // Sequence phases: "landscape" -> "creeper-walk" -> "creeper-fuse" -> "explosion" -> "name" -> "world-gen"
  const [phase, setPhase] = useState<"landscape" | "creeper-walk" | "creeper-fuse" | "explosion" | "name" | "world-gen">("landscape");
  const [tipIndex, setTipIndex] = useState(0);
  const [loadPercent, setLoadPercent] = useState(0);
  const [creeperScale, setCreeperScale] = useState(0.2); // Starts small in distance
  const [legAngle, setLegAngle] = useState(0);
  const [isSwelling, setIsSwelling] = useState(false);

  // 1. High-Performance Canvas Scene Engine for Realistic Minecraft Environment & Debris
  useEffect(() => {
    if (loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Stars in Minecraft Night Sky
    const stars: { x: number; y: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.55,
        size: Math.random() * 3 + 2,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    // Explosion flying Dirt/Grass/Cobblestone Blocks
    let debris: { x: number; y: number; vx: number; vy: number; size: number; type: "grass" | "dirt" | "stone" | "redstone"; rot: number; vrot: number; alpha: number }[] = [];
    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;

    let animId = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Minecraft Night Sky Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "#080a07");
      grad.addColorStop(0.5, "#0f150e");
      grad.addColorStop(1, "#090c08");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Pixel Stars (Crisp square stars)
      stars.forEach((s) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
      });

      // Minecraft Square Moon in Sky
      ctx.fillStyle = "#e6e6e6";
      ctx.fillRect(width * 0.78, height * 0.12, 48, 48);
      ctx.fillStyle = "#cccccc";
      ctx.fillRect(width * 0.78 + 36, height * 0.12 + 8, 12, 32);

      // Distant Silhouetted Minecraft Trees
      ctx.fillStyle = "#090f07";
      const treeSpacing = 70;
      for (let x = 0; x < width + treeSpacing; x += treeSpacing) {
        // Tree trunk
        ctx.fillRect(x + 24, height * 0.48, 16, height * 0.2);
        // Tree foliage layers
        ctx.fillRect(x, height * 0.42, 64, 24);
        ctx.fillRect(x + 8, height * 0.35, 48, 20);
        ctx.fillRect(x + 16, height * 0.28, 32, 16);
      }

      // Minecraft Ground Layer (Grass top, Dirt base)
      const groundY = height * 0.65;
      // Dirt base
      ctx.fillStyle = "#47321c";
      ctx.fillRect(0, groundY, width, height - groundY);

      // Grass block top layer
      ctx.fillStyle = "#557a2b";
      ctx.fillRect(0, groundY, width, 14);
      // Pixelated Grass drips
      ctx.fillStyle = "#4a6c24";
      for (let x = 0; x < width; x += 16) {
        ctx.fillRect(x, groundY + 14, 8, 6);
      }

      // Shockwave Ring on Explosion
      if (shockwaveAlpha > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${shockwaveAlpha})`;
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, shockwaveRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        shockwaveRadius += 30;
        shockwaveAlpha -= 0.035;
      }

      // Flying Minecraft Dirt & Grass Debris Blocks
      debris.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.3; // Gravity
        d.rot += d.vrot;
        d.alpha -= 0.012;

        if (d.alpha > 0) {
          ctx.save();
          ctx.translate(d.x, d.y);
          ctx.rotate(d.rot);
          ctx.globalAlpha = Math.max(0, d.alpha);

          if (d.type === "grass") {
            ctx.fillStyle = "#557a2b";
            ctx.fillRect(-d.size / 2, -d.size / 2, d.size, d.size * 0.35);
            ctx.fillStyle = "#47321c";
            ctx.fillRect(-d.size / 2, -d.size / 2 + d.size * 0.35, d.size, d.size * 0.65);
          } else if (d.type === "dirt") {
            ctx.fillStyle = "#573d26";
            ctx.fillRect(-d.size / 2, -d.size / 2, d.size, d.size);
          } else if (d.type === "redstone") {
            ctx.fillStyle = "#ff2200";
            ctx.fillRect(-d.size / 2, -d.size / 2, d.size, d.size);
          } else {
            ctx.fillStyle = "#666666";
            ctx.fillRect(-d.size / 2, -d.size / 2, d.size, d.size);
          }

          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.strokeRect(-d.size / 2, -d.size / 2, d.size, d.size);
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Trigger Explosion Callback for flying blocks
    (window as unknown as { triggerCinematicExplosion: () => void }).triggerCinematicExplosion = () => {
      debris = [];
      shockwaveRadius = 15;
      shockwaveAlpha = 1.0;
      const types: ("grass" | "dirt" | "stone" | "redstone")[] = ["grass", "dirt", "dirt", "stone", "redstone"];
      for (let i = 0; i < 180; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 28 + 8;
        debris.push({
          x: width / 2,
          y: height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 8,
          size: Math.random() * 20 + 10,
          type: types[Math.floor(Math.random() * types.length)],
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.35,
          alpha: 1.0,
        });
      }
    };

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [loaded]);

  // 2. Cinematic Creeper Sequence Timeline
  useEffect(() => {
    if (loaded) return;
    const reduced = prefersReducedMotion();

    if (reduced) {
      const timer = setTimeout(() => setPhase("world-gen"), 0);
      return () => clearTimeout(timer);
    }

    // Step 1: Landscape reveal -> Creeper begins walking from dark forest
    const t1 = setTimeout(() => {
      setPhase("creeper-walk");
    }, 700);

    return () => clearTimeout(t1);
  }, [loaded]);

  // Handle Walking & Scale Animation loop
  useEffect(() => {
    if (phase !== "creeper-walk") return;

    const startTime = performance.now();
    let animId = 0;

    const walkLoop = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / 2.3);

      // Walk forward from horizon (0.22) to viewer face (1.35)
      setCreeperScale(0.22 + progress * 1.13);
      setLegAngle(Math.sin(elapsed * 12) * 22);

      if (progress < 1) {
        animId = requestAnimationFrame(walkLoop);
      } else {
        // Step 2: Stop close & begin Official Swelling Fuse (fuse.ogg)
        setPhase("creeper-fuse");
        setIsSwelling(true);
        playFuse();

        // Step 3: Official Explosion BOOM! after 1.5s fuse
        setTimeout(() => {
          setPhase("explosion");
          playExplosion();
          if ((window as unknown as { triggerCinematicExplosion?: () => void }).triggerCinematicExplosion) {
            (window as unknown as { triggerCinematicExplosion: () => void }).triggerCinematicExplosion();
          }

          // Step 4: Name & Death Screen Reveal
          setTimeout(() => {
            setPhase("name");
          }, 600);
        }, 1500);
      }
    };

    animId = requestAnimationFrame(walkLoop);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Handle CTA "Respawn"
  const handleEnterWorld = () => {
    playClick();
    setPhase("world-gen");

    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 1800);

    let current = 0;
    const progressInterval = setInterval(() => {
      current += 8;
      setLoadPercent(Math.min(100, current));
      if (current >= 100) {
        clearInterval(progressInterval);
        clearInterval(tipInterval);
        playLevelUp();
        setTimeout(() => setLoaded(true), 500);
      }
    }, 120);
  };

  if (loaded) return null;

  return (
    <div
      ref={ref}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080a07] text-[#e2dfd5] overflow-hidden select-none font-sans ${
        phase === "explosion" ? "animate-[bounce_0.08s_infinite]" : ""
      }`}
    >
      {/* Background Minecraft Environment Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Red Death Tint Overlay on Death Screen */}
      {(phase === "name" || phase === "explosion") && (
        <div className="absolute inset-0 z-1 bg-[#500000]/70 mix-blend-multiply pointer-events-none animate-fade-in" />
      )}

      {/* Explosion Flash Bang Overlay */}
      {phase === "explosion" && (
        <div className="absolute inset-0 z-50 bg-white opacity-95 pointer-events-none" />
      )}

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl w-full">
        {/* Authentic 3D Voxel Creeper Entity Model */}
        {(phase === "creeper-walk" || phase === "creeper-fuse") && (
          <div
            className="flex flex-col items-center transition-transform duration-75 relative"
            style={{
              transform: `scale(${creeperScale}) ${isSwelling ? "scale(1.35)" : ""}`,
              filter: isSwelling
                ? "drop-shadow(0 0 40px #ffffff) drop-shadow(0 0 80px #ffffff)"
                : "drop-shadow(0 24px 35px rgba(0,0,0,0.95))",
            }}
          >
            {/* Minecraft Authentic Creeper Head (16x16 Pixel Texture) */}
            <div
              className={`w-36 h-36 border-4 border-[#000000] relative transition-colors duration-75 ${
                isSwelling ? "bg-[#ffffff] border-[#ff0000] animate-pulse" : "bg-[#4d8c28]"
              }`}
            >
              {/* Green Pixel Mottling Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#3a6b1e_25%,transparent_25%)] bg-[size:10px_10px] opacity-60" />

              {/* Iconic Minecraft Black Eyes */}
              <div className="absolute top-7 left-6 w-8 h-8 bg-[#0a0d08] border-2 border-[#000000]" />
              <div className="absolute top-7 right-6 w-8 h-8 bg-[#0a0d08] border-2 border-[#000000]" />
              
              {/* Iconic Minecraft Creeper Mouth */}
              <div className="absolute top-15 left-12 w-12 h-15 bg-[#0a0d08] border-2 border-[#000000]" />
              <div className="absolute top-22 left-8 w-6 h-12 bg-[#0a0d08] border-2 border-[#000000]" />
              <div className="absolute top-22 right-8 w-6 h-12 bg-[#0a0d08] border-2 border-[#000000]" />
            </div>

            {/* Creeper Torso */}
            <div className="w-28 h-40 border-4 border-[#000000] bg-[#437a23] relative -mt-1 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#305919_25%,transparent_25%)] bg-[size:8px_8px] opacity-60" />
            </div>

            {/* Creeper 4 Walking Legs */}
            <div className="flex gap-1 -mt-1 relative z-10">
              <div
                className="w-12 h-14 border-4 border-[#000000] bg-[#3a6b1e] origin-top"
                style={{ transform: `rotate(${legAngle}deg)` }}
              />
              <div
                className="w-12 h-14 border-4 border-[#000000] bg-[#325c19] origin-top"
                style={{ transform: `rotate(${-legAngle}deg)` }}
              />
            </div>

            {/* Swelling Warning */}
            {phase === "creeper-fuse" && (
              <div className="absolute -bottom-16 font-pixel text-sm text-[#ff2200] tracking-widest animate-ping bg-[#000000]/90 px-6 py-2 border-2 border-[#ff2200]">
                * SSSSSSSSSSSS... *
              </div>
            )}
          </div>
        )}

        {/* Authentic Minecraft "You Died!" Death Screen (Matching User Uploaded Image 2) */}
        {(phase === "name" || phase === "explosion") && (
          <div className="flex flex-col items-center space-y-5 animate-fade-in my-auto">
            {/* Title: You Died! */}
            <h1 className="font-pixel text-[clamp(2.8rem,7vw,5.5rem)] text-[#ffffff] drop-shadow-[0_6px_0_#000000] tracking-wide">
              You Died!
            </h1>

            {/* Subtitle: Player name was blown up by Creeper */}
            <p className="font-pixel text-xs sm:text-base text-[#ffffff] drop-shadow-[0_2px_0_#000000] tracking-wider">
              {portfolioData.personal.name} went up in flames
            </p>

            {/* Yellow Score Display: Score: 911 */}
            <p className="font-pixel text-sm sm:text-lg text-[#ffff55] drop-shadow-[0_2px_0_#000000] tracking-widest pt-1">
              Score: <span className="text-[#ffff55]">911</span>
            </p>

            {/* Authentic Minecraft Stone UI Buttons Container */}
            <div className="pt-6 flex flex-col gap-3.5 w-full max-w-sm sm:max-w-md">
              {/* Top Button: Respawn */}
              <button
                type="button"
                onClick={handleEnterWorld}
                onMouseEnter={playItemHover}
                className="w-full font-pixel text-sm text-[#ffffff] bg-[#727272] hover:bg-[#8c96bc] border-2 border-[#000000] py-3.5 shadow-[inset_-3px_-3px_0_#3a3a3a,inset_3px_3px_0_#a0a0a0] active:translate-y-0.5 transition-all cursor-pointer drop-shadow-[0_2px_0_#000000]"
              >
                Respawn
              </button>

              {/* Bottom Button: Title Screen */}
              <button
                type="button"
                onClick={handleEnterWorld}
                onMouseEnter={playItemHover}
                className="w-full font-pixel text-sm text-[#ffffff] bg-[#727272] hover:bg-[#8c96bc] border-2 border-[#000000] py-3.5 shadow-[inset_-3px_-3px_0_#3a3a3a,inset_3px_3px_0_#a0a0a0] active:translate-y-0.5 transition-all cursor-pointer drop-shadow-[0_2px_0_#000000]"
              >
                Title Screen
              </button>
            </div>
          </div>
        )}

        {/* World Generation Loading Bar */}
        {phase === "world-gen" && (
          <div className="w-full max-w-xl border-4 border-[#000000] bg-[#21251e] p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col items-center">
            <p className="font-pixel text-sm text-[#ffaa00] tracking-widest uppercase">
              Respawning & Generating World...
            </p>

            <div className="w-full h-8 bg-[#111111] border-3 border-[#000000] mt-6 p-1 relative shadow-[inset_2px_2px_0_#000000]">
              <div
                className="h-full bg-gradient-to-r from-[#55a828] to-[#7cbd38] border-r-2 border-[#000000] transition-all duration-150"
                style={{ width: `${loadPercent}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-pixel text-[10px] text-[#ffffff] drop-shadow-[0_2px_0_#000000]">
                {loadPercent}%
              </span>
            </div>

            <div className="mt-8 h-12 flex items-center justify-center">
              <p className="font-vt323 text-lg text-[#55ffff] italic tracking-wide animate-fade-in">
                {TIPS[tipIndex]}
              </p>
            </div>

            <p className="font-pixel text-[9px] text-[#666666] mt-4 uppercase">
              Building Terrain • Loading Crafting Recipes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
