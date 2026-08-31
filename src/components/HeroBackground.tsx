"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/context/ExperienceContext";
import { usePrefersReducedMotion } from "@/lib/useMedia";

// 1. Animated Lava Flow & Embers Canvas Overlay
function LavaFlowOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    // Lava Spark Embers popping & floating upwards
    const embers: { x: number; y: number; vx: number; vy: number; size: number; color: string; alpha: number }[] = [];
    const emberColors = ["#ff3300", "#ff7700", "#ffaa00", "#ffee55"];

    for (let i = 0; i < 40; i++) {
      embers.push({
        x: width * 0.23 + (Math.random() - 0.5) * 80,
        y: height * 0.75 + Math.random() * (height * 0.25),
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(Math.random() * 2.2 + 0.8),
        size: Math.random() * 4 + 2,
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
        alpha: Math.random(),
      });
    }

    let lavaOffsetY = 0;
    let animId = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Lava Waterfall position coordinates (matches the waterfall stream on the left side of cave_bg.png)
      const streamX = width * 0.225;
      const streamWidth = Math.max(28, width * 0.026);
      const streamTop = height * 0.0;
      const streamBottom = height * 0.85;

      lavaOffsetY += 1.8;
      if (lavaOffsetY > 32) lavaOffsetY = 0;

      ctx.save();
      // Flowing Lava Waterfall Texture Animation
      const lavaGrad = ctx.createLinearGradient(streamX, 0, streamX + streamWidth, 0);
      lavaGrad.addColorStop(0, "rgba(255, 60, 0, 0.85)");
      lavaGrad.addColorStop(0.3, "rgba(255, 170, 0, 0.95)");
      lavaGrad.addColorStop(0.7, "rgba(255, 230, 80, 0.95)");
      lavaGrad.addColorStop(1, "rgba(230, 50, 0, 0.85)");

      ctx.fillStyle = lavaGrad;
      ctx.shadowColor = "#ff5500";
      ctx.shadowBlur = 25;
      ctx.fillRect(streamX, streamTop, streamWidth, streamBottom);

      // Inner Animated Fluid Streaks
      ctx.fillStyle = "rgba(255, 255, 200, 0.7)";
      for (let y = streamTop - 32 + lavaOffsetY; y < streamBottom; y += 28) {
        ctx.fillRect(streamX + 4, y, streamWidth - 8, 8);
        ctx.fillRect(streamX + 8, y + 14, streamWidth - 14, 5);
      }

      // Lava Pool Splash & Glowing Base at bottom
      ctx.fillStyle = "rgba(255, 120, 0, 0.5)";
      ctx.beginPath();
      ctx.ellipse(streamX + streamWidth / 2, streamBottom, streamWidth * 2.2, 24, 0, 0, Math.PI * 2);
      ctx.fill();

      // Render Floating & Popping Lava Embers
      embers.forEach((e) => {
        e.y += e.vy;
        e.x += e.vx + Math.sin(e.y * 0.05) * 0.5;
        e.alpha -= 0.008;

        if (e.y < height * 0.1 || e.alpha <= 0) {
          e.y = height * 0.78 + Math.random() * (height * 0.2);
          e.x = streamX + (Math.random() - 0.5) * 90;
          e.alpha = 1.0;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, e.alpha);
        ctx.fillStyle = e.color;
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 8;
        ctx.fillRect(e.x, e.y, e.size, e.size);
        ctx.restore();
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-5 pointer-events-none" />;
}

// 2. 3D Minecraft Ore Block Component (Diamond, Emerald, Gold, Redstone)
function MinecraftOreBlock({
  position,
  oreColor,
  rotationSpeed,
}: {
  position: [number, number, number];
  oreColor: string;
  rotationSpeed: number;
}) {
  const mesh = useRef<THREE.Group>(null);

  const texture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#606060";
    ctx.fillRect(0, 0, 64, 64);

    for (let x = 0; x < 64; x += 4) {
      for (let y = 0; y < 64; y += 4) {
        const shade = ((x * 37 + y * 19) % 30) - 15;
        const base = 96 + shade;
        ctx.fillStyle = `rgb(${base},${base},${base})`;
        ctx.fillRect(x, y, 4, 4);
      }
    }

    ctx.fillStyle = oreColor;
    const specks = [
      [12, 12], [16, 12], [12, 16], [20, 16],
      [40, 8], [44, 8], [40, 12],
      [24, 36], [28, 36], [24, 40], [28, 40],
      [8, 48], [12, 48], [44, 44], [48, 44], [48, 44],
      [36, 24], [40, 24], [36, 28],
    ];

    specks.forEach(([x, y]) => {
      ctx.fillRect(x, y, 4, 4);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x, y, 2, 2);
      ctx.fillStyle = oreColor;
    });

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.magFilter = THREE.NearestFilter;
    canvasTexture.minFilter = THREE.NearestFilter;
    return canvasTexture;
  }, [oreColor]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * rotationSpeed;
      mesh.current.rotation.y += delta * rotationSpeed * 1.3;
      mesh.current.position.y += Math.sin(Date.now() * 0.002 + position[0]) * 0.003;
    }
  });

  return (
    <group ref={mesh} position={position}>
      <mesh>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        {texture ? (
          <meshStandardMaterial map={texture} roughness={0.6} metalness={0.2} />
        ) : (
          <meshStandardMaterial color="#606060" roughness={0.6} />
        )}
      </mesh>
    </group>
  );
}

function MinecraftField() {
  return (
    <group>
      <ambientLight intensity={1.1} />
      <directionalLight position={[6, 12, 6]} intensity={1.6} />

      {/* Floating Minecraft Diamond Ore Block */}
      <MinecraftOreBlock position={[-1.8, 0.9, -1]} oreColor="#55ffff" rotationSpeed={0.5} />
      {/* Floating Minecraft Emerald Ore Block */}
      <MinecraftOreBlock position={[2.0, 1.2, -1.2]} oreColor="#55ff55" rotationSpeed={0.4} />
      {/* Floating Minecraft Gold Ore Block */}
      <MinecraftOreBlock position={[1.6, -1.0, -0.8]} oreColor="#ffaa00" rotationSpeed={0.6} />
      {/* Floating Minecraft Redstone Ore Block */}
      <MinecraftOreBlock position={[-1.6, -1.1, -1.1]} oreColor="#ff3300" rotationSpeed={0.45} />
    </group>
  );
}

export function HeroBackground() {
  const reduced = usePrefersReducedMotion();
  const { loaded } = useExperience();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 1. Minecraft Underground Cave Scene Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cave_bg.png"
        alt="Minecraft Cave Scenery"
        className="absolute inset-0 w-full h-full object-cover opacity-90 filter contrast-110 brightness-95"
      />

      {/* Dark Vignette Overlay for Title Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0c] via-transparent to-[#0d0f0c]/80" />

      {/* 2. Animated Flowing Lava Waterfall Stream & Lava Embers */}
      {!reduced && <LavaFlowOverlay />}

      {/* 3. 3D Floating Minecraft Ore Blocks (Diamond, Emerald, Gold, Redstone) */}
      {!reduced && loaded ? (
        <Canvas
          className="absolute inset-0 z-10"
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 3.2], fov: 60 }}
        >
          <MinecraftField />
        </Canvas>
      ) : null}
    </div>
  );
}
