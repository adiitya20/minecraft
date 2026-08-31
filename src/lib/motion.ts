import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  registered = true;
}

registerGsap();

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  const chars = [...text].map((char) => {
    const span = document.createElement("span");
    span.className = "char";
    span.innerHTML = char === " " ? "&nbsp;" : char;
    el.appendChild(span);
    return span;
  });
  return chars;
}

export function splitLines(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  text.split(/\s+/).forEach((word) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = `${word} `;
    el.appendChild(span);
  });

  const words = Array.from(el.querySelectorAll<HTMLElement>(".word"));
  const groups: HTMLElement[][] = [];
  let top = Number.NaN;

  words.forEach((word) => {
    if (word.offsetTop !== top) {
      top = word.offsetTop;
      groups.push([]);
    }
    groups[groups.length - 1].push(word);
  });

  return groups.map((group) => {
    const line = document.createElement("span");
    line.className = "line";
    const inner = document.createElement("span");
    inner.className = "line-inner";
    group.forEach((word) => inner.appendChild(word));
    line.appendChild(inner);
    el.appendChild(line);
    return inner;
  });
}

export function clipReveal(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
) {
  return gsap.fromTo(
    targets,
    { clipPath: "inset(0 0 100% 0)", y: 24 },
    {
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      duration: 1,
      ease: "power4.out",
      ...vars,
    },
  );
}

export function slideReveal(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
) {
  return gsap.from(targets, {
    yPercent: 110,
    duration: 0.9,
    ease: "power3.out",
    ...vars,
  });
}

export function fadeReveal(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
) {
  return gsap.from(targets, {
    opacity: 0,
    y: 16,
    duration: 0.7,
    ease: "power2.out",
    ...vars,
  });
}

export function staggerReveal(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
) {
  return gsap.from(targets, {
    y: 28,
    opacity: 0,
    duration: 0.7,
    stagger: 0.06,
    ease: "power3.out",
    ...vars,
  });
}

export function textReveal(el: HTMLElement, vars: gsap.TweenVars = {}) {
  const lines = splitLines(el);
  return gsap.from(lines, {
    yPercent: 110,
    duration: 0.9,
    stagger: 0.08,
    ease: "power3.out",
    ...vars,
  });
}

export function parallax(
  el: gsap.TweenTarget,
  distance = 80,
  trigger?: gsap.DOMTarget,
) {
  return gsap.to(el, {
    y: distance,
    ease: "none",
    scrollTrigger: {
      trigger: trigger ?? (el as gsap.DOMTarget),
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function magneticHover(
  el: HTMLElement,
  options: { strength?: number; range?: number; label?: HTMLElement | null } = {},
) {
  const strength = options.strength ?? 0.28;
  const range = options.range ?? 110;
  const label = options.label;

  const reset = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    if (label) {
      gsap.to(label, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    }
  };

  const onMove = (event: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(x, y);
    if (distance > range) {
      reset();
      return;
    }
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.35,
      ease: "power3.out",
    });
    if (label) {
      gsap.to(label, {
        x: x * strength * 0.45,
        y: y * strength * 0.45,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  };

  window.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", reset);

  return () => {
    window.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", reset);
    gsap.set(el, { x: 0, y: 0 });
  };
}

export function velocityEffect(targets: HTMLElement[]) {
  const reduced = prefersReducedMotion();
  if (reduced) return () => undefined;

  let current = 0;
  const onTick = () => {
    const lenis = window.__portfolioLenis;
    const velocity = lenis?.velocity ?? 0;
    current += (velocity - current) * 0.12;
    const skew = gsap.utils.clamp(-6, 6, current * 1.8);
    const scaleY = gsap.utils.clamp(0.96, 1.06, 1 + Math.abs(current) * 0.012);
    targets.forEach((el) => {
      el.style.transform = `skewX(${skew}deg) scaleY(${scaleY})`;
    });
  };

  gsap.ticker.add(onTick);
  return () => {
    gsap.ticker.remove(onTick);
    targets.forEach((el) => {
      el.style.transform = "";
    });
  };
}

declare global {
  interface Window {
    __portfolioLenis?: {
      raf: (time: number) => void;
      destroy: () => void;
      scrollTo: (
        target: string | HTMLElement | number,
        options?: Record<string, unknown>,
      ) => void;
      stop: () => void;
      start: () => void;
      velocity: number;
    };
  }
}
