"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { profile } from "@/data/profile";

export default function TimeSpentCard() {
  return (
    <motion.div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-6"
      whileHover={{
        y: -4,
        boxShadow: "0 24px 60px -12px rgba(34, 197, 94, 0.18)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent-green" />
        <span className="font-mono text-xs font-semibold tracking-widest text-dark-muted">
          ENGINEERING SIGNAL
        </span>
      </div>

      <div className="space-y-4">
        {profile.heroStats.map((stat, index) => (
          <div
            key={stat.label}
            className={`rounded-2xl border px-4 py-3 ${
              index === 0
                ? "border-accent-green/30 bg-accent-green/5"
                : "border-white/8 bg-white/[0.03]"
            }`}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-dark-muted">
                  {stat.label}
                </p>
                <p className="mt-2 font-mono text-4xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-dark-muted">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
