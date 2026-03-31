"use client";

import { useState } from "react";
import PageTransition from "@/components/shared/PageTransition";
import FilterPills from "@/components/projects/FilterPills";
import ViewToggle from "@/components/projects/ViewToggle";
import { getProjectsByCategory } from "@/data/projects";
import type { ProjectCategory, ViewMode } from "@/data/types";

export default function ProjectsPage() {
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredProjects = getProjectsByCategory(category);

  return (
    <PageTransition className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Page Header */}
        <div className="mb-10 flex flex-col gap-6">
          <h1 className="text-5xl font-bold tracking-tight text-black">
            Project
          </h1>

          {/* Filters + View Toggle */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <FilterPills
              activeCategory={category}
              onCategoryChange={setCategory}
            />
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>
        </div>

        {/* Content Area — will be populated by Task 14 */}
        <div className="text-sm text-gray-400">
          {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""} — {viewMode} view
        </div>
      </div>
    </PageTransition>
  );
}
