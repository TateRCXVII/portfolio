"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  ExternalLink,
  FileCode2,
  GitBranch,
  Lock,
  Tags,
} from "lucide-react";
import type { Project } from "@/data/types";
import SnapshotTabs from "@/components/projects/SnapshotTabs";
import StickyFooter from "@/components/shared/StickyFooter";
import PageTransition from "@/components/shared/PageTransition";
import { staggerContainer, fadeInUp } from "@/lib/animations";

function ArtifactBadge({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
        <Lock className="h-4 w-4" />
        Visibility
      </div>
      <p className="text-sm leading-relaxed text-gray-700">
        {project.confidentiality === "public"
          ? "This project includes public artifacts and can expose real repository links or code snippets."
          : "This project is represented through public-safe writeups, architecture notes, and redacted decisions rather than internal source code."}
      </p>
    </div>
  );
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <PageTransition className="min-h-screen bg-white pb-20 pt-20">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="mb-8">
          <Link href="/projects">
            <motion.span
              className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
              whileHover={{ x: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowLeft size={18} />
              Back to projects
            </motion.span>
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-4xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                {project.category.replaceAll("-", " ")}
              </p>
              <h1 className="text-4xl font-bold tracking-tight">{project.name}</h1>
              <p className="mt-3 text-lg leading-relaxed text-gray-600">
                {project.headline}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.company && (
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700">
                  <Building2 className="h-4 w-4" />
                  {project.company}
                </span>
              )}
              <span className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700">
                {project.updatedAt}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          className="grid gap-6"
          style={{ gridTemplateColumns: "1.15fr 1fr 0.85fr" }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
              <GitBranch className="h-4 w-4" />
              Overview
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-700">
              {project.summary}
            </p>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Role
                </p>
                <p>{project.overview.role}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Scope
                </p>
                <p>{project.overview.scope}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Stack
                </p>
                <p>{project.overview.stack}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Ownership
                </p>
                <p>{project.overview.ownership}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <SnapshotTabs snapshot={project.snapshot} />
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <ArtifactBadge project={project} />

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                <Tags className="h-4 w-4" />
                Project Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Impact
            </p>
            <div className="space-y-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric}
                  className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-700"
                >
                  {metric}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Public Artifacts
            </p>
            <div className="space-y-3">
              {project.artifactLinks.map((artifact) => (
                <a
                  key={artifact.label}
                  href={artifact.href}
                  target={artifact.href.startsWith("http") ? "_blank" : undefined}
                  rel={artifact.href.startsWith("http") ? "noreferrer" : undefined}
                  className="block rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 transition-colors hover:border-gray-200 hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {artifact.label}
                      </p>
                      {artifact.note && (
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          {artifact.note}
                        </p>
                      )}
                    </div>
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {project.architecture && project.architecture.length > 0 && (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Architecture
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {project.architecture.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {section.summary}
                  </p>
                  <div className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <p key={bullet} className="text-sm leading-relaxed text-gray-600">
                        {bullet}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.decisions && project.decisions.length > 0 && (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Architecture Decisions
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {project.decisions.map((decision) => (
                <div
                  key={decision.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                >
                  <h3 className="text-base font-semibold text-gray-900">
                    {decision.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {decision.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.codeHighlights && project.codeHighlights.length > 0 && (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
              <FileCode2 className="h-4 w-4" />
              Code Highlights
            </p>
            <div className="space-y-4">
              {project.codeHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-gray-900">
                      {highlight.title}
                    </h3>
                    {highlight.file && (
                      <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
                        {highlight.file}
                      </span>
                    )}
                  </div>
                  <pre className="mt-4 overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
                    <code>{highlight.snippet}</code>
                  </pre>
                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    {highlight.commentary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <StickyFooter backHref="/projects" title={project.name} />
    </PageTransition>
  );
}
