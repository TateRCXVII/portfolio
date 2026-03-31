"use client";

import { useRef, useEffect, useState } from "react";

interface TerminalInputProps {
  onSubmit: (value: string) => void;
  onHistoryUp: () => string | null;
  onHistoryDown: () => string | null;
  onTabComplete: (partial: string) => string | null;
}

export default function TerminalInput({
  onSubmit,
  onHistoryUp,
  onHistoryDown,
  onTabComplete,
}: TerminalInputProps) {
  const [value, setValue] = useState("");
  const [ghost, setGhost] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update ghost text whenever value changes
  useEffect(() => {
    if (value.startsWith("/") && value.length > 1) {
      const completion = onTabComplete(value);
      if (completion && completion !== value) {
        setGhost(completion);
      } else {
        setGhost(null);
      }
    } else {
      setGhost(null);
    }
  }, [value, onTabComplete]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = value.trim();
      if (val) {
        onSubmit(val);
        setValue("");
        setGhost(null);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = onHistoryUp();
      if (prev !== null) setValue(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = onHistoryDown();
      if (next !== null) setValue(next);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (ghost) {
        setValue(ghost);
        setGhost(null);
      } else {
        const completion = onTabComplete(value);
        if (completion) {
          setValue(completion);
        }
      }
    }
  }

  // The ghost text is the full completion; we show only the suffix after current value
  const ghostSuffix =
    ghost && ghost.startsWith(value) ? ghost.slice(value.length) : null;

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className="flex-shrink-0 text-accent-green">&gt;</span>
      <div className="relative flex flex-1 items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-white caret-transparent outline-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
        {/* Ghost text overlay */}
        <span className="pointer-events-none absolute left-0 top-0 flex items-center font-mono text-sm">
          <span className="invisible">{value}</span>
          {ghostSuffix && (
            <span className="text-gray-600">{ghostSuffix}</span>
          )}
        </span>
        {/* Blinking cursor block */}
        <span className="pointer-events-none absolute left-0 top-0 flex items-center font-mono text-sm">
          <span className="invisible">{value}</span>
          <span
            className="inline-block h-[1em] w-[0.6em] animate-pulse bg-accent-green"
            aria-hidden="true"
          />
        </span>
      </div>
    </div>
  );
}
