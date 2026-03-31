"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalEngine } from "./TerminalEngine";
import type { TerminalLine } from "./TerminalEngine";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import "@/commands";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const engineRef = useRef<TerminalEngine | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialise engine once
  if (!engineRef.current) {
    engineRef.current = new TerminalEngine((updated) => {
      setLines(updated);
    });
  }

  // Auto-scroll to bottom whenever lines change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Escape key closes
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback((value: string) => {
    const engine = engineRef.current!;
    // Check for clear sentinel
    const trimmed = value.trim().toLowerCase().replace(/^\//, "");
    if (trimmed === "clear") {
      engine.clear();
    } else {
      engine.execute(value);
    }
  }, []);

  const handleHistoryUp = useCallback(() => {
    return engineRef.current!.getHistoryUp();
  }, []);

  const handleHistoryDown = useCallback(() => {
    return engineRef.current!.getHistoryDown();
  }, []);

  const handleTabComplete = useCallback((partial: string) => {
    return engineRef.current!.getTabCompletion(partial);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Terminal window */}
          <motion.div
            key="terminal"
            layoutId="hero-card"
            className="fixed inset-8 z-50 flex flex-col overflow-hidden rounded-2xl"
            style={{ background: "#1a1a2e" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Title bar */}
            <div className="flex flex-shrink-0 items-center border-b border-white/10 px-4 py-3">
              {/* Traffic lights */}
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                  aria-label="Close terminal"
                />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              {/* Centered title */}
              <p className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-gray-400">
                tate@portfolio ~ /terminal
              </p>
            </div>

            {/* Output area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 pb-2"
            >
              <TerminalOutput lines={lines} />
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 border-t border-white/10 p-4 pt-3">
              <TerminalInput
                onSubmit={handleSubmit}
                onHistoryUp={handleHistoryUp}
                onHistoryDown={handleHistoryDown}
                onTabComplete={handleTabComplete}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
