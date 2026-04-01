"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Hash, User, Wrench, Settings } from "lucide-react";
import type { Project } from "@/data/types";
import SnapshotTabs from "@/components/projects/SnapshotTabs";
import DesignFocusCard from "@/components/projects/DesignFocusCard";
import StickyFooter from "@/components/shared/StickyFooter";
import PageTransition from "@/components/shared/PageTransition";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const overviewIcons = { type: Hash, role: User, tool: Wrench, contribution: Settings };

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <PageTransition className="min-h-screen bg-white pb-20 pt-20">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Back + Title */}
        <div className="mb-8">
          <Link href="/projects">
            <motion.span
              className="mb-2 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
              whileHover={{ x: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowLeft size={18} />
            </motion.span>
          </Link>
          <h1 className="text-4xl font-bold">{project.name}</h1>
        </div>

        {/* 3-column grid */}
        <motion.div
          className="mb-8 grid grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Info */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-6"
          >
            <p className="mb-6 text-sm leading-relaxed text-gray-700">
              {project.description}
            </p>
            <h3 className="mb-4 text-lg font-bold">Overview</h3>
            <div className="space-y-3">
              {(
                Object.keys(project.overview) as Array<
                  keyof typeof project.overview
                >
              ).map((key) => {
                const Icon = overviewIcons[key];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between border-b border-gray-100 pb-2"
                  >
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-500">
                      <Icon size={12} /> {key}
                    </span>
                    <span className="text-sm text-gray-700">
                      {project.overview[key]}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Center: Snapshot */}
          <motion.div variants={fadeInUp}>
            <SnapshotTabs snapshot={project.snapshot} />
          </motion.div>

          {/* Right: Design Focus */}
          <motion.div variants={fadeInUp}>
            <DesignFocusCard items={project.designFocus} />
          </motion.div>
        </motion.div>

        {/* Analogous Experiences */}
        {project.analogous && project.analogous.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
              <span>✦</span> ANALOGOUS EXPERIENCES
            </div>
            <div className="grid grid-cols-2 gap-6">
              {project.analogous.map((item) => (
                <motion.div
                  key={item.title}
                  className="flex gap-6 rounded-2xl border border-gray-100 bg-gray-50 p-6"
                  whileHover={{
                    y: -4,
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="h-48 w-80 flex-shrink-0 overflow-hidden rounded-xl bg-gray-800">
                    <div className="flex h-full items-center justify-center text-gray-500">
                      <div className="text-center text-xs">
                        <div className="mb-2 flex gap-1.5 px-3">
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                          <div className="h-2 w-2 rounded-full bg-yellow-500" />
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                        Screenshot
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3 text-lg font-bold">{item.title}</h4>
                    <div className="mb-2">
                      <p className="text-sm font-semibold">Pros</p>
                      <p className="text-sm text-gray-600">{item.pros}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Cons</p>
                      <p className="text-sm text-gray-600">{item.cons}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <StickyFooter backHref="/projects" title={project.name} />
    </PageTransition>
  );
}
