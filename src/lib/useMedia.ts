"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./motion";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches || prefersReducedMotion());
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useIsTouch() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouch(coarse.matches || "ontouchstart" in window);
    update();
    coarse.addEventListener("change", update);
    return () => coarse.removeEventListener("change", update);
  }, []);

  return touch;
}

export function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return desktop;
}
