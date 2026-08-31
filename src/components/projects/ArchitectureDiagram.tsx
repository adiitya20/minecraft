"use client";

import { useState } from "react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";

type Props = {
  project: Project;
  active?: boolean;
};

export function ArchitectureDiagram({ project, active = true }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const nodes = project.architecture.nodes;
  const edges = project.architecture.edges;
  const entities = "entities" in project.architecture ? project.architecture.entities : undefined;

  const related = new Set<string>();
  if (hover && entities) {
    const entity = entities.find((item) => item.id === hover);
    entity?.related.forEach((id) => related.add(id));
    related.add(hover);
  }

  const hoveredNode = nodes.find((node) => node.id === hover);

  return (
    <div className="relative">
      <div
        className={cn(
          "grid gap-3 transition-opacity duration-500",
          project.architecture.kind === "stack" ? "md:grid-cols-6" : "md:grid-cols-4",
        )}
      >
        {nodes.map((node, index) => (
          <button
            key={node.id}
            type="button"
            onMouseEnter={() => setHover(node.id)}
            onMouseLeave={() => setHover(null)}
            className={cn(
              "arch-node border px-3 py-4 text-left transition-all duration-500",
              hover === node.id
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--line)] bg-[var(--white)]/50",
              active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-40",
            )}
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <span className="mono text-[10px] tracking-[0.16em] uppercase opacity-60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="display mt-2 block text-sm tracking-[-0.03em]">{node.label}</span>
          </button>
        ))}
      </div>
      <svg className="pointer-events-none mt-3 h-8 w-full" aria-hidden>
        {edges.map(([from, to], i) => {
          const a = nodes.findIndex((n) => n.id === from);
          const b = nodes.findIndex((n) => n.id === to);
          if (a < 0 || b < 0) return null;
          const x1 = ((a + 0.5) / nodes.length) * 100;
          const x2 = ((b + 0.5) / nodes.length) * 100;
          return (
            <line
              key={`${from}-${to}-${i}`}
              x1={`${x1}%`}
              y1="10%"
              x2={`${x2}%`}
              y2="90%"
              stroke="currentColor"
              strokeOpacity={active ? 0.35 : 0.08}
              className="arch-line"
            />
          );
        })}
      </svg>
      <p className="min-h-[3rem] text-sm text-[var(--ink-soft)]">
        {hoveredNode?.detail ?? "Hover a node to inspect the pipeline."}
      </p>
      {entities ? (
        <div className="mt-6">
          <p className="mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-soft)]">
            Database entities
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {entities.map((entity) => (
              <li key={entity.id}>
                <button
                  type="button"
                  onMouseEnter={() => setHover(entity.id)}
                  onMouseLeave={() => setHover(null)}
                  className={cn(
                    "mono border px-3 py-2 text-[10px] tracking-[0.14em] uppercase transition-colors",
                    related.size === 0 || related.has(entity.id)
                      ? "border-[var(--ink)]"
                      : "border-[var(--line)] opacity-30",
                  )}
                >
                  {entity.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
