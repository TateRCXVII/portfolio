"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MatrixRain from "./MatrixRain";
import { profile } from "@/data/profile";

interface HeroCardProps {
  onOpenTerminal: () => void;
}

export default function HeroCard({ onOpenTerminal }: HeroCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layoutId="hero-card"
      className="relative h-full cursor-pointer overflow-hidden rounded-2xl border border-dark-border bg-dark-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenTerminal}
      whileHover={{
        boxShadow: "0 20px 60px -12px rgba(34, 197, 94, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <MatrixRain speed={isHovered ? 2.5 : 1} />

      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div>
          <motion.h1
            className="font-mono text-6xl font-bold leading-tight text-white"
            animate={{
              textShadow: isHovered
                ? "0 0 20px rgba(34, 197, 94, 0.5)"
                : "0 0 0px rgba(34, 197, 94, 0)",
            }}
            transition={{ duration: 0.3 }}
          >
            Tate
            <br />
            Reynolds
          </motion.h1>
        </div>

        <motion.p
          className="font-mono text-sm text-dark-muted"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isHovered ? 1 : 0.6 }}
        >
          {profile.title} <span className="text-accent-green">&gt;</span> AI
          systems, full-stack product work, and architecture notes from Salt Lake
          City.
          <motion.span
            className="inline-block"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.53, repeat: Infinity, repeatType: "reverse" }}
          >
            _
          </motion.span>
        </motion.p>
      </div>
    </motion.div>
  );
}
