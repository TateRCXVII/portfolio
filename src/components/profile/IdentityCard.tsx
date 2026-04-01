"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as Icons from "lucide-react";

interface IdentityCardProps {
  icon: string;
  description: string;
  tags: string[];
  label: string;
  backContent: string;
  index: number;
}

export default function IdentityCard({
  icon,
  description,
  tags,
  label,
  backContent,
  index,
}: IdentityCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  // Dynamically resolve icon from lucide-react
  const IconComponent = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 1200 }}
      className="h-72 cursor-pointer"
      onClick={() => setIsFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Front face */}
        <motion.div
          style={{ backfaceVisibility: "hidden" }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm group"
        >
          {/* Icon top-left */}
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
            className="mb-3"
          >
            {IconComponent ? (
              <IconComponent size={24} className="text-gray-700" />
            ) : (
              <span className="text-lg">?</span>
            )}
          </motion.div>

          {/* Description */}
          <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
            {description}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.15, delay: i * 0.03 }}
                className="rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-500"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Label at bottom */}
          <p className="text-xl font-bold text-gray-900">{label}</p>
        </motion.div>

        {/* Back face */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 flex flex-col rounded-2xl bg-gray-900 p-5"
        >
          <p className="flex-1 text-sm leading-relaxed text-gray-300">
            {backContent}
          </p>
          <p className="mt-4 text-xs text-gray-500">Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
