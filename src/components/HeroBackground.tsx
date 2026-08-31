"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/context/ExperienceContext";
import { usePrefersReducedMotion } from "@/lib/useMedia";

// 3D Minecraft Ore Block Component (Diamond, Emerald, Gold, Redstone)
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

  // Generate procedural Minecraft Ore Canvas Texture (Stone + Ore Speckles)
  const texture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Base Minecraft Stone Texture (Grey pixel grid)
    ctx.fillStyle = "#606060";
    ctx.fillRect(0, 0, 64, 64);

    // Stone Texture Shading pixels
    for (let x = 0; x < 64; x += 4) {
      for (let y = 0; y < 64; y += 4) {
        const shade = ((x * 37 + y * 19) % 30) - 15;
        const base = 96 + shade;
        ctx.fillStyle = `rgb(${base},${base},${base})`;
        ctx.fillRect(x, y, 4, 4);
      }
    }

    // Embedded Minecraft Ore Gem Speckles
    ctx.fillStyle = oreColor;
    const specks = [
      [12, 12], [16, 12], [12, 16], [20, 16],
      [40, 8], [44, 8], [40, 12],
      [24, 36], [28, 36], [24, 40], [28, 40],
      [8, 48], [12, 48], [44, 44], [48, 44], [44, 48],
      [36, 24], [40, 24], [36, 28],
    ];

    specks.forEach(([x, y]) => {
      ctx.fillRect(x, y, 4, 4);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x, y, 2, 2); // Highlight speck
      ctx.fillStyle = oreColor;
    });

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.magFilter = THREE.NearestFilter; // Sharp pixelated rendering
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
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 12, 6]} intensity={1.4} />

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

function Fallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#121410] via-[#1a1d17] to-[#161814]">
      <div className="absolute top-16 left-12 w-32 h-10 bg-white/10 border-2 border-white/20" />
      <div className="absolute top-28 right-20 w-48 h-12 bg-white/10 border-2 border-white/20" />
    </div>
  );
}

export function HeroBackground() {
  const reduced = usePrefersReducedMotion();
  const { loaded } = useExperience();

  if (reduced) return <Fallback />;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Fallback />
      {loaded ? (
        <Canvas
          className="absolute inset-0"
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
