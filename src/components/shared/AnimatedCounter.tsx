"use client";

import { useEffect, useRef } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  formatFn?: (val: number) => string;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  className = "",
  formatFn,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (latest) =>
    formatFn ? formatFn(Math.round(latest)) : Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
