"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { profile } from "@/data/profile";

const SEGMENT_COLORS = [
  "#22c55e",
  "#16a34a",
  "#15803d",
  "#4ade80",
  "#86efac",
  "#ec4899",
  "#d946ef",
  "#a855f7",
  "#f472b6",
  "#eab308",
];

function CountUpNumber({
  value,
  trigger,
  delay,
}: {
  value: number;
  trigger: boolean;
  delay: number;
}) {
  const [current, setCurrent] = useState(value);
  const prevTrigger = useRef(trigger);

  useEffect(() => {
    if (trigger && !prevTrigger.current) {
      // Card just became hovered — run count-up after stagger delay
      const steps = 15;
      const stepDuration = 40;
      const timeoutId = setTimeout(() => {
        setCurrent(0);
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const progress = step / steps;
          setCurrent(Math.round(progress * value));
          if (step >= steps) clearInterval(interval);
        }, stepDuration);
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(timeoutId);
    }
    if (!trigger && prevTrigger.current) {
      // Card hover ended — snap back to final value
      setCurrent(value);
    }
    prevTrigger.current = trigger;
  }, [trigger, value, delay]);

  return <>{current}</>;
}

export default function SkillMatrixCard() {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(null);
  const [hoveredToolIndex, setHoveredToolIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; score: number } | null>(null);

  const { skills, tools } = profile;

  return (
    <motion.div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-5"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setHoveredSkillIndex(null);
      }}
      whileHover={{ boxShadow: "0 20px 60px -12px rgba(34, 197, 94, 0.10)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 size={14} className="text-accent-green" />
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-dark-muted">
          Engineering Skill Matrix
        </span>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Left: Skills */}
        <div className="flex flex-1 flex-col gap-1">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="relative flex cursor-pointer items-center justify-between rounded px-2 py-1"
              onMouseEnter={() => setHoveredSkillIndex(i)}
              onMouseLeave={() => setHoveredSkillIndex(null)}
              onClick={() =>
                setTooltip(
                  tooltip?.name === skill.name
                    ? null
                    : { name: skill.name, score: skill.score }
                )
              }
              animate={{
                backgroundColor:
                  hoveredSkillIndex === i
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.15 }}
            >
              <span className="font-mono text-xs text-dark-muted">{skill.name}</span>
              <motion.span
                className="ml-2 min-w-[28px] rounded px-1.5 py-0.5 text-center font-mono text-xs font-bold"
                animate={{
                  backgroundColor:
                    hoveredSkillIndex === i
                      ? SEGMENT_COLORS[i % SEGMENT_COLORS.length]
                      : "rgba(255,255,255,0.06)",
                  color:
                    hoveredSkillIndex === i
                      ? "#0a0a0a"
                      : SEGMENT_COLORS[i % SEGMENT_COLORS.length],
                }}
                transition={{ duration: 0.15 }}
              >
                <CountUpNumber
                  value={skill.score}
                  trigger={isCardHovered}
                  delay={i * 0.05}
                />
              </motion.span>

              {/* Tooltip */}
              <AnimatePresence>
                {tooltip?.name === skill.name && (
                  <motion.div
                    className="absolute right-0 top-full z-20 mt-1 rounded border border-dark-border bg-dark-card px-3 py-1.5 shadow-lg"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <p className="font-mono text-xs text-white">{tooltip.name}</p>
                    <p
                      className="font-mono text-xs"
                      style={{ color: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
                    >
                      score: {tooltip.score}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Right: Tools */}
        <div className="flex w-28 flex-col gap-1">
          {tools.map((tool, i) => (
            <motion.div
              key={tool}
              className="cursor-default rounded px-2 py-1"
              onMouseEnter={() => setHoveredToolIndex(i)}
              onMouseLeave={() => setHoveredToolIndex(null)}
              animate={{
                textShadow:
                  hoveredToolIndex === i
                    ? "0 0 12px rgba(34,197,94,0.7)"
                    : "0 0 0px rgba(34,197,94,0)",
                color: hoveredToolIndex === i ? "#ffffff" : "#6b7280",
              }}
              transition={{ duration: 0.15 }}
            >
              <span className="font-mono text-xs">{tool}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comment lines */}
      <div className="mt-3 flex flex-col items-end gap-0.5">
        <span className="font-mono text-[10px] text-dark-muted opacity-40">
          // skill scores are self-assessed (total = 100)
        </span>
        <span className="font-mono text-[10px] text-dark-muted opacity-40">
          // always iterating, always improving
        </span>
      </div>

      {/* Stacked skill bar */}
      <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="origin-bottom"
            style={{
              width: `${skill.score}%`,
              backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
            }}
            animate={{
              opacity:
                hoveredSkillIndex === null ? 1 : hoveredSkillIndex === i ? 1 : 0.3,
              scaleY: hoveredSkillIndex === i ? 1.4 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
