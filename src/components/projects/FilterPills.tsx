"use client";

import { motion } from "framer-motion";
import { categoryCounts, categoryLabels } from "@/data/projects";
import type { ProjectCategory } from "@/data/types";

const categories: ProjectCategory[] = [
  "all",
  "ai-systems",
  "platform",
  "product-engineering",
  "research",
  "security",
];

interface FilterPillsProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

export default function FilterPills({
  activeCategory,
  onCategoryChange,
}: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            whileHover={{ scale: isActive ? 1 : 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-black"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {!isActive && (
              <span className="absolute inset-0 rounded-full border border-gray-200 bg-white" />
            )}
            <span
              className={`relative z-10 ${
                isActive ? "text-white" : "text-gray-700"
              }`}
            >
              {categoryLabels[category]}
            </span>
            <motion.span
              className={`relative z-10 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
              animate={
                isActive
                  ? {
                      scale: [1, 1.3, 1],
                      transition: { duration: 0.4 },
                    }
                  : { scale: 1 }
              }
            >
              {categoryCounts[category]}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
