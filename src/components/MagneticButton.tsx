"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { magneticHover } from "@/lib/motion";
import { useExperience } from "@/context/ExperienceContext";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/useMedia";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  cursor?: "open" | "view" | "default";
  type?: "button" | "submit";
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  cursor = "open",
  type = "button",
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const { setCursorMode } = useExperience();
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || touch || reduced) return;
    return magneticHover(el, { label: label.current, strength: 0.22, range: 100 });
  }, [touch, reduced]);

  const shared = {
    className: cn("magnetic group", className),
    onMouseEnter: () => setCursorMode(cursor),
    onMouseLeave: () => setCursorMode("default"),
  };

  const inner = (
    <span ref={label} className="relative inline-flex items-center gap-3">
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
    </span>
  );

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        {...shared}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...shared}
    >
      {inner}
    </button>
  );
}
