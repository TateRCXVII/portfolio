"use client";

import { useState } from "react";
import type { CaseStudy } from "@/data/types";

interface TableOfContentsProps {
  toc: CaseStudy["toc"];
  onNavigate: (id: string) => void;
}

export default function TableOfContents({ toc, onNavigate }: TableOfContentsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="py-6">
      {toc.map((section) => (
        <div key={section.section} className="mb-6">
          {/* Section header */}
          <div className="border-t-2 border-gray-900 pt-3 pb-2">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono text-gray-400">{section.section}</span>
              <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
                {section.title}
              </span>
            </div>
          </div>

          {/* Subsection rows */}
          <div>
            {section.subsections.map((sub) => {
              const isHovered = hoveredId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => onNavigate(sub.id)}
                  onMouseEnter={() => setHoveredId(sub.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="flex w-full items-center py-1.5 text-left"
                  style={{
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  {/* Title */}
                  <span className="text-sm text-gray-700 shrink-0">{sub.title}</span>

                  {/* Dotted leader line */}
                  <span
                    className="mx-2 flex-1 border-b border-dotted border-gray-400"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                  {!isHovered && <span className="flex-1" />}

                  {/* Page number */}
                  <span className="text-sm font-mono text-gray-400 shrink-0 ml-2">
                    {sub.page}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
