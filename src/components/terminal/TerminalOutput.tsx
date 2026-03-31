"use client";

import { useState, useEffect, useRef } from "react";
import type { TerminalLine } from "./TerminalEngine";

interface TypewriterLineProps {
  content: string;
  minDelay?: number;
  maxDelay?: number;
}

function TypewriterLine({
  content,
  minDelay = 8,
  maxDelay = 15,
}: TypewriterLineProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const chars = Array.from(content);
    if (chars.length === 0) {
      setDone(true);
      return;
    }

    function tick() {
      if (indexRef.current >= chars.length) {
        setDone(true);
        return;
      }
      indexRef.current++;
      setDisplayed(chars.slice(0, indexRef.current).join(""));
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      setTimeout(tick, delay);
    }

    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    const t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [content, minDelay, maxDelay]);

  return (
    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
      {displayed}
      {!done && <span className="animate-pulse text-accent-green">▌</span>}
    </pre>
  );
}

interface TerminalOutputProps {
  lines: TerminalLine[];
}

export default function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <div className="space-y-1">
      {lines.map((line) => {
        if (line.type === "welcome") {
          return (
            <pre
              key={line.id}
              className="whitespace-pre font-mono text-xs text-accent-green"
            >
              {line.content}
            </pre>
          );
        }

        if (line.type === "input") {
          return (
            <div key={line.id} className="flex gap-2 font-mono text-sm">
              <span className="text-accent-green">&gt;</span>
              <span className="text-white">{line.content}</span>
            </div>
          );
        }

        if (line.type === "error") {
          return (
            <pre
              key={line.id}
              className="whitespace-pre-wrap font-mono text-sm text-red-400"
            >
              {line.content}
            </pre>
          );
        }

        // output — typewriter
        return <TypewriterLine key={line.id} content={line.content} />;
      })}
    </div>
  );
}
