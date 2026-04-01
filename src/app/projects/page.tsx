"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/shared/PageTransition";
import FilterPills from "@/components/projects/FilterPills";
import ViewToggle from "@/components/projects/ViewToggle";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectListRow from "@/components/projects/ProjectListRow";
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

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-3 gap-4 auto-rows-[200px]"
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-2 pl-4 pr-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Project
                    </th>
                    <th className="py-2 px-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Preview
                    </th>
                    <th className="py-2 px-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Category
                    </th>
                    <th className="py-2 px-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Status
                    </th>
                    <th className="py-2 pl-2 pr-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <ProjectListRow key={project.slug} project={project} />
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
