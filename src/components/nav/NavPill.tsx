"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavPillProps {
  href: string;
  label: string;
  isActive: boolean;
}

export default function NavPill({ href, label, isActive }: NavPillProps) {
  return (
    <Link href={href} className="relative px-5 py-2 text-sm font-medium">
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-black"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <motion.span
        className={`relative z-10 transition-colors duration-200 ${
          isActive ? "text-white" : "text-gray-600 hover:text-black"
        }`}
        whileHover={{ scale: 1.05 }}
      >
        {label}
      </motion.span>
    </Link>
  );
}
