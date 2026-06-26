"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Layers3,
  Wrench,
  FlaskConical,
  Shield,
} from "lucide-react";
import type { Project } from "@/data/types";
import { categoryLabels } from "@/data/projects";

interface ProjectListRowProps {
  project: Project;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "ai-systems": <Bot size={14} />,
  platform: <Layers3 size={14} />,
  "product-engineering": <Wrench size={14} />,
  research: <FlaskConical size={14} />,
  security: <Shield size={14} />,
};

const statusConfig: Record<
  Project["status"],
  { dot: string; label: string }
> = {
  shipped: { dot: "bg-green-500", label: "Shipped" },
  "in-progress": { dot: "bg-sky-500", label: "In Progress" },
  concept: { dot: "bg-pink-400", label: "Concept" },
  "live-demo": { dot: "bg-yellow-400", label: "Live Demo" },
};

const categoryGradients: Record<string, string> = {
  "ai-systems": "from-emerald-950 via-zinc-900 to-emerald-800",
  platform: "from-slate-950 via-slate-800 to-sky-900",
  "product-engineering": "from-zinc-950 via-stone-800 to-amber-900",
  research: "from-blue-950 via-indigo-900 to-cyan-900",
  security: "from-rose-950 via-zinc-900 to-rose-900",
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
