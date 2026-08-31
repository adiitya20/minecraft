"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, registerGsap } from "./motion";

export function useLenis() {
  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
      autoRaf: false,
    });

    window.__portfolioLenis = lenis as unknown as Window["__portfolioLenis"];
    lenis.on("scroll", () => ScrollTrigger.update());

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      window.__portfolioLenis = undefined;
    };
  }, []);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__portfolioLenis) {
    window.__portfolioLenis.scrollTo(el, { offset: 0, duration: 1.15 });
    return;
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
