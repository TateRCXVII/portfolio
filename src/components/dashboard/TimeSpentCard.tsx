"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { profile } from "@/data/profile";

const GAUGE_PROGRESS = 0.72;
const CENTER_X = 150;
const CENTER_Y = 160;
const RADIUS = 130;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

// Arc from 180° to 0° (left to right across the top of the semicircle)
// In SVG coordinates: 180° = leftmost point, 0° = rightmost point
// We go from 180° (left) sweeping clockwise through 270° (top) to 360°/0° (right)
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

// Full background arc: 180° → 360° (left to right, top semicircle)
const BG_ARC = describeArc(CENTER_X, CENTER_Y, RADIUS, 180, 360);

// Colored arc up to progress point
function coloredArcPath(progress: number) {
  const endAngle = 180 + progress * 180;
  return describeArc(CENTER_X, CENTER_Y, RADIUS, 180, endAngle);
}

function indicatorPosition(progress: number) {
  const angle = 180 + progress * 180;
  return polarToCartesian(CENTER_X, CENTER_Y, RADIUS, angle);
}

export default function TimeSpentCard() {
  const [hovered, setIsHovered] = useState(false);
  const [counterKey, setCounterKey] = useState(0);

  const springProgress = useSpring(0, { stiffness: 60, damping: 18 });
  const indicatorAngle = useTransform(springProgress, (v) => 180 + v * 180);

  const dotX = useTransform(indicatorAngle, (angle) =>
    polarToCartesian(CENTER_X, CENTER_Y, RADIUS, angle).x
  );
  const dotY = useTransform(indicatorAngle, (angle) =>
    polarToCartesian(CENTER_X, CENTER_Y, RADIUS, angle).y
  );

  useEffect(() => {
    springProgress.set(GAUGE_PROGRESS);
  }, [springProgress]);

  function handleMouseEnter() {
    setIsHovered(true);
    setCounterKey((k) => k + 1);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  const leftDot = polarToCartesian(CENTER_X, CENTER_Y, RADIUS, 180);
  const rightDot = polarToCartesian(CENTER_X, CENTER_Y, RADIUS, 360);

  return (
    <motion.div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={
        hovered
          ? { y: -4, boxShadow: "0 24px 60px -12px rgba(236, 72, 153, 0.25)" }
          : { y: 0, boxShadow: "0 0px 0px 0px rgba(236, 72, 153, 0)" }
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Idle pulse glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={
          hovered
            ? { opacity: 0 }
            : {
                opacity: [0, 0.08, 0],
                boxShadow: [
                  "0 0 0px 0px rgba(236, 72, 153, 0)",
                  "0 0 40px 8px rgba(236, 72, 153, 0.3)",
                  "0 0 0px 0px rgba(236, 72, 153, 0)",
                ],
              }
        }
        transition={hovered ? { duration: 0.2 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dark-muted"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="font-mono text-xs font-semibold tracking-widest text-dark-muted">
          ENGINEERING TIME SPENT
        </span>
      </div>

      {/* Counter */}
      <div className="mb-2 flex items-baseline gap-2">
        <AnimatedCounter
          key={counterKey}
          value={profile.hoursSpent}
          duration={2.5}
          className="font-mono text-5xl font-bold text-white"
        />
        <span className="font-mono text-sm text-dark-muted">hrs</span>
      </div>

      {/* Gauge SVG */}
      <div className="mt-auto flex-1 flex items-end justify-center">
        <svg
          viewBox="0 0 300 180"
          className="w-full max-w-[300px]"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d={BG_ARC}
            fill="none"
            stroke="#333"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Colored progress arc */}
          <path
            d={coloredArcPath(GAUGE_PROGRESS)}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Start dot */}
          <circle cx={leftDot.x} cy={leftDot.y} r="5" fill="#ec4899" />

          {/* End dot */}
          <circle cx={rightDot.x} cy={rightDot.y} r="5" fill="#555" />

          {/* Animated indicator dot */}
          <motion.circle
            cx={dotX}
            cy={dotY}
            r="8"
            fill="white"
            style={{ filter: "drop-shadow(0 0 6px rgba(168, 85, 247, 0.8))" }}
          />
          <motion.circle
            cx={dotX}
            cy={dotY}
            r="4"
            fill="#a855f7"
          />

          {/* Labels */}
          <text
            x={leftDot.x}
            y={leftDot.y + 20}
            textAnchor="middle"
            className="fill-dark-muted"
            style={{ fill: "#666", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.05em" }}
          >
            2020 BOSTON
          </text>
          <text
            x={rightDot.x}
            y={rightDot.y + 20}
            textAnchor="middle"
            style={{ fill: "#666", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.05em" }}
          >
            2025 SAN FRANCISCO
          </text>
        </svg>
      </div>
    </motion.div>
  );
}
