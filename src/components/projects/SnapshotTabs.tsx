"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3 } from "lucide-react";

interface SnapshotTabsProps {
  snapshot: {
    goal: string;
    challenge: string;
    outcome: string;
  };
}

const TABS = ["Goal", "Challenge", "Outcome"] as const;
type Tab = (typeof TABS)[number];

export default function SnapshotTabs({ snapshot }: SnapshotTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Goal");

  const content: Record<Tab, string> = {
    Goal: snapshot.goal,
    Challenge: snapshot.challenge,
    Outcome: snapshot.outcome,
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Grid3X3 className="h-4 w-4 text-gray-500" />
        <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
          Project Snapshot
        </span>
      </div>

      {/* Tab pills */}
      <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 p-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
              activeTab === tab
                ? "text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {activeTab === tab && (
              <motion.span
                layoutId="snapshot-tab"
                className="absolute inset-0 rounded-full bg-black"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[140px]">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
          {activeTab}
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-sm leading-relaxed text-gray-700"
          >
            {content[activeTab]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
