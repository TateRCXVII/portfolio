"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/types";
import { categoryLabels } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

// Gradient colors per category for the thumbnail placeholder
const categoryGradients: Record<string, string> = {
  dashboard: "from-blue-900 via-indigo-800 to-blue-700",
  app: "from-purple-900 via-violet-800 to-purple-700",
  website: "from-teal-900 via-emerald-800 to-teal-700",
  visual: "from-rose-900 via-pink-800 to-rose-700",
  fun: "from-amber-900 via-orange-800 to-amber-700",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const isFeatured = project.featured === true;
  const gradient =
    categoryGradients[project.category] ?? "from-gray-900 via-gray-800 to-gray-700";
  const firstLetter = project.name.charAt(0).toUpperCase();

  return (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] ${
        isFeatured ? "col-span-2 row-span-2" : ""
      }`}
      whileHover={{
        y: -8,
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-col h-full"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          {/* Category label — slides in from left on hover */}
          <motion.span
            initial={{ x: -8, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            className="text-xs font-semibold uppercase tracking-wider text-gray-400"
          >
            {categoryLabels[project.category]}
          </motion.span>
          <div className="flex items-center gap-2">
            {/* Traffic light dots for featured */}
            {isFeatured && (
              <div className="flex items-center gap-1 mr-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
            )}
            {/* Company badge */}
            {project.company && (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-gray-300">
                {project.company}
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail area */}
        <div
          className={`relative mx-4 flex-1 overflow-hidden rounded-xl bg-gradient-to-br ${gradient} ${
            isFeatured ? "min-h-[220px]" : "min-h-[120px]"
          }`}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <span
              className={`font-bold text-white/20 select-none ${
                isFeatured ? "text-[10rem]" : "text-[5rem]"
              }`}
            >
              {firstLetter}
            </span>
          </motion.div>
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Card Footer */}
        <div className="flex items-end justify-between px-4 pt-3 pb-4">
          <span
            className={`font-semibold text-white leading-tight ${
              isFeatured ? "text-xl" : "text-sm"
            }`}
          >
            {project.name}
          </span>

          {/* "Discover" button slides up from below on hover */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: 24, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="block rounded-full bg-white px-3 py-1 text-xs font-semibold text-black"
            >
              Discover
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
