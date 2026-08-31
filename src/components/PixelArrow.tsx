import React from "react";

type Props = {
  direction?: "right" | "left" | "up" | "down";
  className?: string;
  color?: string;
  size?: number;
};

export function PixelArrow({ direction = "right", className = "", color = "currentColor", size = 16 }: Props) {
  const rotationMap: Record<string, string> = {
    right: "rotate-0",
    down: "rotate-90",
    left: "rotate-180",
    up: "-rotate-90",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pixelated ${rotationMap[direction]} ${className}`}
    >
      {/* Minecraft Stepped Pixel Arrow Shape */}
      <rect x="0" y="7" width="10" height="2" fill={color} />
      <rect x="8" y="5" width="2" height="6" fill={color} />
      <rect x="10" y="3" width="2" height="10" fill={color} />
      <rect x="12" y="1" width="2" height="14" fill={color} />
      <rect x="14" y="6" width="2" height="4" fill={color} />
    </svg>
  );
}
