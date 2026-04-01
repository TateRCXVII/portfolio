"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Globe,
  Eye,
  Sparkles,
} from "lucide-react";
import type { Project } from "@/data/types";
import { categoryLabels } from "@/data/projects";

interface ProjectListRowProps {
  project: Project;
}

const categoryIcons: Record<string, React.ReactNode> = {
  dashboard: <Monitor size={14} />,
  app: <Smartphone size={14} />,
  website: <Globe size={14} />,
  visual: <Eye size={14} />,
  fun: <Sparkles size={14} />,
};

const statusConfig: Record<
  Project["status"],
  { dot: string; label: string }
> = {
  shipped: { dot: "bg-green-500", label: "Shipped" },
  concept: { dot: "bg-pink-400", label: "Concept" },
  "live-demo": { dot: "bg-yellow-400", label: "Live Demo" },
};

const categoryGradients: Record<string, string> = {
  dashboard: "from-blue-900 via-indigo-800 to-blue-700",
  app: "from-purple-900 via-violet-800 to-purple-700",
  website: "from-teal-900 via-emerald-800 to-teal-700",
  visual: "from-rose-900 via-pink-800 to-rose-700",
  fun: "from-amber-900 via-orange-800 to-amber-700",
};

export default function ProjectListRow({ project }: ProjectListRowProps) {
  const status = statusConfig[project.status];
  const gradient =
    categoryGradients[project.category] ?? "from-gray-900 via-gray-800 to-gray-700";
  const firstLetter = project.name.charAt(0).toUpperCase();

  return (
    <motion.tr
      whileHover={{ x: 4, backgroundColor: "#f9fafb" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group cursor-pointer border-b border-gray-100 bg-white transition-colors"
    >
      <td className="py-3 pl-4 pr-2">
        <Link
          href={`/projects/${project.slug}`}
          className="flex items-center w-56 gap-2 font-medium text-sm text-gray-900 hover:text-black truncate"
        >
          {project.name}
        </Link>
      </td>

      {/* Thumbnail */}
      <td className="py-3 px-2">
        <Link href={`/projects/${project.slug}`}>
          <div
            className={`h-14 w-32 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
          >
            <span className="text-3xl font-bold text-white/20 select-none">
              {firstLetter}
            </span>
          </div>
        </Link>
      </td>

      {/* Category */}
      <td className="py-3 px-2">
        <Link href={`/projects/${project.slug}`}>
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            {categoryIcons[project.category]}
            {categoryLabels[project.category]}
          </span>
        </Link>
      </td>

      {/* Status */}
      <td className="py-3 px-2">
        <Link href={`/projects/${project.slug}`}>
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <span
              className={`h-2 w-2 rounded-full flex-shrink-0 ${status.dot}`}
            />
            {status.label}
          </span>
        </Link>
      </td>

      {/* Date */}
      <td className="py-3 pl-2 pr-4 text-right">
        <Link href={`/projects/${project.slug}`}>
          <span className="text-sm text-gray-400">{project.updatedAt}</span>
        </Link>
      </td>
    </motion.tr>
  );
}
