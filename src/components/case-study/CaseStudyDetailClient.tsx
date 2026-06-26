"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { LibraryEntry } from "@/data/types";
import TableOfContents from "@/components/case-study/TableOfContents";
import StickyFooter from "@/components/shared/StickyFooter";
import PageTransition from "@/components/shared/PageTransition";

export default function CaseStudyDetailClient({ study }: { study: LibraryEntry }) {
  const { title, subtitle, bookColor, toc, content, metadata } = study;

  const [flashedId, setFlashedId] = useState<string | null>(null);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setFlashedId(id);
      setTimeout(() => setFlashedId(null), 800);
    }
  }, []);

  return (
    <PageTransition className="min-h-screen bg-white">
      {/* Top header bar */}
      <div className="border-b border-gray-200 py-3 text-center">
        <p className="text-xs font-mono tracking-[0.3em] text-gray-400">
          00.0 &nbsp;&nbsp; CONTENTS
        </p>
      </div>

      {/* Split pane */}
      <div className="flex min-h-screen pb-16">
        {/* Left half */}
        <motion.div
          className="w-1/2 border-r border-gray-200 flex flex-col justify-between p-12"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div>
            <h1
              style={{ fontFamily: "Georgia, serif" }}
              className="text-5xl font-bold leading-tight text-blue-900 mb-4"
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{ fontFamily: "Georgia, serif" }}
                className="text-lg italic text-blue-600"
              >
                {subtitle}
              </p>
            )}
            <div className="mt-6 space-y-2 text-xs uppercase tracking-[0.3em] text-gray-400">
              <p>{metadata.format}</p>
              <p>{metadata.context}</p>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600">
              {metadata.takeaway}
            </p>
          </div>

          {/* Decorative element at bottom */}
          <div className="flex items-end gap-4">
            <div
              className="h-1 flex-1 rounded-full"
              style={{ background: bookColor.spine }}
            />
            <div
              className="h-2 w-8 rounded-full"
              style={{ background: bookColor.accent }}
            />
            <div
              className="h-1 w-4 rounded-full"
              style={{ background: bookColor.cover }}
            />
          </div>
        </motion.div>

        {/* Right half */}
        <div className="w-1/2 overflow-y-auto">
          {/* Cover art placeholder */}
          <div
            className="mx-8 mt-10 mb-6 flex h-48 items-center justify-center rounded-2xl overflow-hidden"
            style={{
              background: `radial-gradient(circle at 40% 40%, ${bookColor.cover}, ${bookColor.spine})`,
            }}
          >
            <div
              className="h-24 w-24 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle, ${bookColor.accent}, transparent)`,
              }}
            />
          </div>

          {/* Table of Contents */}
          <div className="px-8">
            <TableOfContents toc={toc} onNavigate={handleNavigate} />
          </div>

          {/* Content sections */}
          <div className="px-8 pt-4 pb-20 space-y-12">
            {content.map((section) => (
              <div
                key={section.id}
                id={section.id}
                style={{
                  transition: "background 0.3s ease",
                  background:
                    flashedId === section.id
                      ? "rgba(250, 204, 21, 0.18)"
                      : "transparent",
                  borderRadius: 8,
                  padding: flashedId === section.id ? "12px" : "0",
                }}
              >
                <h2 className="mb-3 text-xl font-bold text-gray-900">
                  {section.heading}
                </h2>
                {section.body.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-3 text-sm leading-relaxed text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <StickyFooter backHref="/case-study" title={title} />
    </PageTransition>
  );
}
