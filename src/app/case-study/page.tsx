"use client";
import PageTransition from "@/components/shared/PageTransition";
import BookShelf from "@/components/case-study/BookShelf";

export default function CaseStudyPage() {
  return (
    <PageTransition className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-[1400px] px-8 py-6">
        <h1 className="mb-3 text-5xl font-bold">Library</h1>
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-gray-600">
          Architecture diagrams, technical essays, and research notes that show
          how I think about systems, not just what I shipped.
        </p>
        <div className="overflow-hidden rounded-3xl border border-green-200 bg-green-50/30 py-12">
          <BookShelf />
        </div>
      </div>
    </PageTransition>
  );
}
