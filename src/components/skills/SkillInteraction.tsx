"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

type Props = {
  active: string | null;
};

export function SkillInteraction({ active }: Props) {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const node = svg.current;
    if (!node) return;
    const parent = node.parentElement;
    if (!parent) return;

    const draw = () => {
      node.innerHTML = "";
      if (!active) return;
      const related = portfolioData.skillRelations[active] ?? [];
      const source = parent.querySelector<HTMLElement>(`[data-skill="${CSS.escape(active)}"]`);
      if (!source) return;
      const rootBox = parent.getBoundingClientRect();
      const from = source.getBoundingClientRect();
      related.forEach((name) => {
        const target = parent.querySelector<HTMLElement>(`[data-skill="${CSS.escape(name)}"]`);
        if (!target) return;
        const to = target.getBoundingClientRect();
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(from.left + from.width / 2 - rootBox.left));
        line.setAttribute("y1", String(from.top + from.height / 2 - rootBox.top));
        line.setAttribute("x2", String(to.left + to.width / 2 - rootBox.left));
        line.setAttribute("y2", String(to.top + to.height / 2 - rootBox.top));
        line.setAttribute("stroke", "#b44a28");
        line.setAttribute("stroke-width", "1");
        line.setAttribute("stroke-opacity", "0.45");
        node.appendChild(line);
      });
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [active]);

  return (
    <svg
      ref={svg}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden
    />
  );
}
