"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/data/types";

const BOOK_WIDTH = 180;
const BOOK_HEIGHT = 320;
const BOOK_DEPTH = 50;

interface Book3DProps {
  study: CaseStudy;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  hoveredIndex: number | null;
}

export default function Book3D({
  study,
  index,
  isHovered,
  onHover,
  hoveredIndex,
}: Book3DProps) {
  const { bookColor, title, slug } = study;

  const isAnotherHovered = hoveredIndex !== null && !isHovered;
  const slideX =
    isAnotherHovered && hoveredIndex !== null
      ? index < hoveredIndex
        ? -60
        : 60
      : 0;

  const rotateY = isHovered ? 5 : 30;
  const scale = isHovered ? 1.15 : 1;

  return (
    <Link href={`/case-study/${slug}`} style={{ display: "block" }}>
      <motion.div
        style={{ perspective: 800 }}
        animate={{ x: slideX }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        onHoverStart={() => onHover(index)}
        onHoverEnd={() => onHover(null)}
      >
        <motion.div
          style={{
            width: BOOK_WIDTH,
            height: BOOK_HEIGHT,
            position: "relative",
            transformStyle: "preserve-3d",
            cursor: "pointer",
          }}
          animate={{ rotateY, scale }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          {/* Shadow */}
          <motion.div
            style={{
              position: "absolute",
              bottom: -8,
              left: "10%",
              right: "10%",
              height: 20,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.2)",
              filter: "blur(8px)",
              transformStyle: "flat",
            }}
            animate={{ opacity: isHovered ? 0.5 : 0.2, scaleX: isHovered ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />

          {/* Front Cover */}
          <motion.div
            style={{
              position: "absolute",
              width: BOOK_WIDTH,
              height: BOOK_HEIGHT,
              backfaceVisibility: "hidden",
              background: bookColor.cover,
              borderRadius: "2px 6px 6px 2px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "20px 16px",
              overflow: "hidden",
              transformOrigin: "left center",
              translateZ: BOOK_DEPTH / 2,
            }}
          >
            {/* Shine sweep on hover */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
                pointerEvents: "none",
              }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{
                duration: isHovered ? 0.6 : 0,
                ease: "easeInOut",
                delay: isHovered ? 0.1 : 0,
              }}
            />

            {/* Accent stripe at top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: bookColor.accent,
              }}
            />

            {/* Title text */}
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.3,
                textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                margin: 0,
                zIndex: 1,
              }}
            >
              {title}
            </p>
          </motion.div>

          {/* Spine */}
          <div
            style={{
              position: "absolute",
              width: BOOK_DEPTH,
              height: BOOK_HEIGHT,
              background: bookColor.spine,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "left center",
              transform: `rotateY(-90deg) translateZ(0px) translateX(-${BOOK_DEPTH}px)`,
              boxShadow: "inset -4px 0 8px rgba(0,0,0,0.2)",
            }}
          >
            <p
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontFamily: "Georgia, serif",
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.08em",
                margin: 0,
                maxHeight: BOOK_HEIGHT - 40,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {title}
            </p>
          </div>

          {/* Pages edge */}
          <div
            style={{
              position: "absolute",
              width: BOOK_DEPTH,
              height: BOOK_HEIGHT,
              transformOrigin: "left center",
              transform: `rotateY(90deg) translateZ(${BOOK_WIDTH}px) translateX(-${BOOK_DEPTH}px)`,
              background: bookColor.pages,
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.04) 2px,
                rgba(0,0,0,0.04) 3px
              )`,
              boxShadow: "inset 2px 0 6px rgba(0,0,0,0.1)",
            }}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
}
