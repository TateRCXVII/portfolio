"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/case-studies";
import Book3D from "./Book3D";

export default function BookShelf() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 24,
        perspective: "1200px",
        paddingBottom: 24,
        paddingTop: 24,
      }}
    >
      {caseStudies.map((study, index) => (
        <Book3D
          key={study.slug}
          study={study}
          index={index}
          isHovered={hoveredIndex === index}
          onHover={setHoveredIndex}
          hoveredIndex={hoveredIndex}
        />
      ))}
    </motion.div>
  );
}
