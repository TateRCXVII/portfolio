"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface RadarData {
  axis: string;
  value: number;
}

interface RadarChartProps {
  data: RadarData[];
  goals: string[];
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleIndex: number,
  total: number
): [number, number] {
  // Start from top (-90 deg), go clockwise
  const angle = (Math.PI * 2 * angleIndex) / total - Math.PI / 2;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

function polygonPoints(
  cx: number,
  cy: number,
  r: number,
  total: number
): string {
  return Array.from({ length: total }, (_, i) => {
    const [x, y] = polarToCartesian(cx, cy, r, i, total);
    return `${x},${y}`;
  }).join(" ");
}

export default function RadarChart({ data, goals }: RadarChartProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [goalIndex, setGoalIndex] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "0px 0px -40px 0px" });

  const cx = 150;
  const cy = 140;
  const maxRadius = 100;
  const levels = 5;
  const n = data.length;

  // Data polygon points
  const dataPoints = data.map((d, i) => {
    const r = (d.value / 100) * maxRadius;
    return polarToCartesian(cx, cy, r, i, n);
  });
  const dataPolygon = dataPoints.map(([x, y]) => `${x},${y}`).join(" ");

  // Animated polygon: starts at center and expands
  const centerPolygon = Array.from({ length: n }, () => `${cx},${cy}`).join(" ");

  // Scale labels along the first axis (index 0)
  const scaleLabels = [20, 40, 60, 80, 100];

  return (
    <div style={{ perspective: 1200 }} className="cursor-pointer" onClick={() => setIsFlipped((f) => !f)}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Front face */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="rounded-2xl bg-gray-900 p-5 text-white"
        >
          <svg
            ref={svgRef}
            viewBox="0 0 300 280"
            className="w-full"
            style={{ height: 220 }}
          >
            {/* Concentric grid polygons */}
            {Array.from({ length: levels }, (_, lvl) => {
              const r = ((lvl + 1) / levels) * maxRadius;
              return (
                <polygon
                  key={lvl}
                  points={polygonPoints(cx, cy, r, n)}
                  fill="none"
                  stroke="#374151"
                  strokeWidth={1}
                />
              );
            })}

            {/* Axis lines */}
            {data.map((_, i) => {
              const [x, y] = polarToCartesian(cx, cy, maxRadius, i, n);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#374151"
                  strokeWidth={1}
                />
              );
            })}

            {/* Scale labels along first axis */}
            {scaleLabels.map((val) => {
              const r = (val / 100) * maxRadius;
              const [x, y] = polarToCartesian(cx, cy, r, 0, n);
              return (
                <text
                  key={val}
                  x={x + 3}
                  y={y}
                  fontSize={7}
                  fill="#6b7280"
                  textAnchor="start"
                  dominantBaseline="middle"
                >
                  {val}
                </text>
              );
            })}

            {/* Data polygon — animated from center outward */}
            <motion.polygon
              initial={{ points: centerPolygon }}
              animate={inView ? { points: dataPolygon } : { points: centerPolygon }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              fill="rgba(34, 197, 94, 0.15)"
              stroke="#22c55e"
              strokeWidth={2}
            />

            {/* Data dots */}
            {dataPoints.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={3}
                fill="#22c55e"
                opacity={inView ? 1 : 0}
              />
            ))}

            {/* Axis labels */}
            {data.map((d, i) => {
              const labelR = maxRadius + 18;
              const [lx, ly] = polarToCartesian(cx, cy, labelR, i, n);
              const isHovered = hoveredIndex === i;
              return (
                <g
                  key={d.axis}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ cursor: "default" }}
                >
                  <text
                    x={lx}
                    y={ly}
                    fontSize={isHovered ? 10 : 8}
                    fill={isHovered ? "#22c55e" : "#9ca3af"}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ transition: "font-size 0.15s, fill 0.15s" }}
                  >
                    {isHovered ? `${d.axis} ${d.value}%` : d.axis}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Goal section */}
          <div className="mt-2 px-1">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Goal
            </p>
            <p className="text-xs leading-relaxed text-gray-300">
              {goals[goalIndex]}
            </p>
            <div className="mt-2 flex gap-1">
              {goals.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setGoalIndex(i);
                  }}
                  className={`h-1.5 w-4 rounded-full transition-colors ${
                    i === goalIndex ? "bg-green-500" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Flip button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(true);
            }}
            className="mt-3 text-xs text-gray-500 hover:text-green-400 transition-colors"
          >
            Flip me →
          </button>
        </div>

        {/* Back face */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            inset: 0,
          }}
          className="rounded-2xl bg-gray-900 p-5 text-white flex flex-col"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
            More About Me
          </p>
          <div className="flex-1 space-y-3">
            {data.map((d) => (
              <div key={d.axis} className="flex items-center gap-2">
                <span className="w-28 text-xs text-gray-400">{d.axis}</span>
                <div className="flex-1 h-1.5 rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${d.value}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-gray-400">
                  {d.value}%
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">Click to flip back</p>
        </div>
      </motion.div>
    </div>
  );
}
