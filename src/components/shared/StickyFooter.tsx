"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Layers,
  BarChart3,
  User,
  List,
  ArrowUp,
  ChevronLeft,
} from "lucide-react";

interface StickyFooterProps {
  backHref: string;
  title: string;
}

const NAV_LINKS = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Project", href: "/projects", icon: Layers },
  { label: "Case Study", href: "/case-studies", icon: BarChart3 },
  { label: "My Profile", href: "/profile", icon: User },
];

export default function StickyFooter({ backHref, title }: StickyFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Left: Back + title */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ x: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Link
              href={backHref}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Go Back
            </Link>
          </motion.div>
          <span className="text-gray-300">·</span>
          <span className="text-sm text-gray-500 truncate max-w-[160px]">
            {title}
          </span>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 transition-colors">
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={scrollToTop}
            className="rounded-lg p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-green-700">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
