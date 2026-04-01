"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus } from "lucide-react";
import NavPill from "./NavPill";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/projects", label: "Project" },
  { href: "/case-study", label: "Case Study" },
];

export default function Navbar() {
  const pathname = usePathname();

  const getIsActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isDark = pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 ${
        isDark ? "text-white" : "text-black"
      }`}
    >
      <Link href="/" className="text-sm font-semibold tracking-wider">
        TATE REYNOLDS
      </Link>

      <nav
        className={`flex items-center gap-1 rounded-full border px-1 py-1 ${
          isDark
            ? "border-white/20 bg-white/5 backdrop-blur-md"
            : "border-gray-200 bg-white/80 backdrop-blur-md"
        }`}
      >
        {navItems.map((item) => (
          <NavPill
            key={item.href}
            href={item.href}
            label={item.label}
            isActive={getIsActive(item.href)}
            isDark={isDark}
          />
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button
          className={`rounded-full p-2 transition-colors ${
            isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <Minus size={18} />
        </button>
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400" />
      </div>
    </motion.header>
  );
}
