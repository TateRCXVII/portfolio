"use client";
import PageTransition from "@/components/shared/PageTransition";
import BookShelf from "@/components/case-study/BookShelf";

export default function CaseStudyPage() {
  return (
    <PageTransition className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-[1400px] px-8 py-6">
        <h1 className="mb-4 text-5xl font-bold">Case Study</h1>
        <div className="overflow-hidden rounded-3xl border border-green-200 bg-green-50/30 py-12">
          <BookShelf />
        </div>
      </div>
    </PageTransition>
  );
}
