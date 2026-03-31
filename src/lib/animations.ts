import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02, y: -4 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const cardLift = {
  whileHover: {
    y: -8,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};
