"use client";

import { Globe } from "lucide-react";
import DotMatrixMap from "@/components/shared/DotMatrixMap";
import { profile } from "@/data/profile";

export default function ExperienceMapCard() {
  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-dark-border bg-dark-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Globe className="h-4 w-4 text-dark-muted" />
        <span className="text-xs font-semibold uppercase tracking-widest text-dark-muted">
          Salt Lake / Wasatch
        </span>
      </div>

      {/* Map */}
      <div className="relative flex-1 overflow-hidden rounded-lg">
        <DotMatrixMap
          locations={profile.experience}
          showPath={true}
          animate={true}
          className="h-full w-full"
        />
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
        {profile.experience.map((loc, i) => {
          const isLast = i === profile.experience.length - 1;
          return (
            <div key={loc.city} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: isLast ? "#22c55e" : "#eab308" }}
              />
              <span className="text-xs text-dark-muted">{loc.city}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
