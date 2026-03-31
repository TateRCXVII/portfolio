"use client";

import { motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import type { ViewMode } from "@/data/types";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold tracking-wider text-gray-400">
        VIEW BY
      </span>
      <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
        {(["grid", "list"] as ViewMode[]).map((mode) => {
          const isActive = viewMode === mode;
          const Icon = mode === "grid" ? LayoutGrid : List;
          return (
            <motion.button
              key={mode}
              onClick={() => onViewChange(mode)}
              whileHover={isActive ? {} : { backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.93 }}
              className={`relative flex items-center justify-center p-2 transition-colors focus:outline-none ${
                isActive ? "bg-black" : "bg-white"
              }`}
              aria-label={`Switch to ${mode} view`}
            >
              <Icon
                size={16}
                className={isActive ? "text-white" : "text-gray-400"}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
