"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface DesignFocusItem {
  label: string;
  leftLabel: string;
  rightLabel: string;
  current: number;
  target: number;
}

interface DesignFocusCardProps {
  items: DesignFocusItem[];
}

function ScaleRow({
  item,
  index,
}: {
  item: DesignFocusItem;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  // current and target are 1–5; normalise to 0–1 for percentage
  const currentPct = ((item.current - 1) / 4) * 100;
  const targetPct = ((item.target - 1) / 4) * 100;

  const dotDelay = index * 0.08;

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left / Right labels */}
      <div className="flex justify-between mb-1">
        <span
          className={`text-xs transition-colors duration-200 ${
            hovered ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {item.leftLabel}
        </span>
        <span
          className={`text-xs transition-colors duration-200 ${
            hovered ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {item.rightLabel}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-2 rounded-full bg-gray-100">
        {/* Current dot (yellow) */}
        <motion.div
          initial={{ left: "50%" }}
          animate={{ left: `${currentPct}%` }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 22,
            delay: dotDelay,
          }}
          whileHover={{ scale: 1.6 }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-yellow-400 cursor-pointer z-10"
          style={{ left: `${currentPct}%` }}
        />

        {/* Target dot (green) */}
        <motion.div
          initial={{ left: "50%" }}
          animate={{ left: `${targetPct}%` }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 22,
            delay: dotDelay + 0.04,
          }}
          whileHover={{ scale: 1.6 }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-green-500 cursor-pointer z-10"
          style={{ left: `${targetPct}%` }}
        />
      </div>

      {/* Label */}
      <p
        className={`mt-1 text-center text-xs transition-colors duration-200 ${
          hovered ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {item.label}
      </p>
    </div>
  );
}

export default function DesignFocusCard({ items }: DesignFocusCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
          Design Focus
        </span>
        {/* Legend */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="text-xs text-gray-500">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500">Target</span>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-5">
        {items.map((item, i) => (
          <ScaleRow key={item.label} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
