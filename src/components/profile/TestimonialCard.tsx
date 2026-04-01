"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Profile } from "@/data/types";

interface TestimonialCardProps {
  testimonials: Profile["testimonials"];
}

export default function TestimonialCard({ testimonials }: TestimonialCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-cycle every 4 seconds, pauses on hover
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, testimonials.length]);

  return (
    <div
      className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
        Testimonials
      </p>

      <div className="flex-1 space-y-2 overflow-hidden">
        {testimonials.map((t, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={t.name}
              onClick={() => setActiveIndex(i)}
              animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.97,
                y: isActive ? 0 : 2,
              }}
              transition={{ duration: 0.3 }}
              className={`cursor-pointer rounded-xl p-3 border transition-colors ${
                isActive
                  ? "border-gray-200 shadow-sm bg-white"
                  : "border-transparent bg-gray-50"
              }`}
            >
              {/* Quote mark */}
              <motion.span
                animate={{ fontSize: isActive ? "2rem" : "1.25rem" }}
                transition={{ duration: 0.25 }}
                className="block leading-none text-gray-200 font-serif"
                style={{ lineHeight: 1 }}
              >
                "
              </motion.span>

              {/* Truncated quote when inactive, full when active */}
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.p
                    key="full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 text-xs leading-relaxed text-gray-700"
                  >
                    {t.quote}
                  </motion.p>
                ) : (
                  <motion.p
                    key="trunc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 text-xs leading-relaxed text-gray-400 line-clamp-1"
                  >
                    {t.quote}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Author info */}
              <div className="mt-2 flex items-center gap-2">
                {/* Company logo placeholder */}
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded text-[8px] font-bold transition-all ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-400 grayscale"
                  }`}
                >
                  {t.company[0]}
                </div>
                <div>
                  <p className={`text-xs font-semibold ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                    {t.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {t.title} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="mt-3 flex gap-1">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? "w-4 bg-gray-900" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
