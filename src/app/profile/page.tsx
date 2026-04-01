"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";
import IdentityCard from "@/components/profile/IdentityCard";
import RadarChart from "@/components/profile/RadarChart";
import DotMatrixMap from "@/components/shared/DotMatrixMap";
import TestimonialCard from "@/components/profile/TestimonialCard";
import { profile } from "@/data/profile";

export default function ProfilePage() {
  return (
    <PageTransition className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-[1400px] px-8 py-6">
        <h1 className="mb-8 text-5xl font-bold">My Profile</h1>

        {/* Identity cards - 4 columns */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {profile.identityCards.map((card, i) => (
            <IdentityCard key={card.label} {...card} index={i} />
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 2fr 1fr" }}>
          <RadarChart data={profile.persona} goals={profile.goals} />

          <div className="rounded-2xl border border-gray-100 bg-gray-900 p-6 text-white">
            <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
              <Globe size={14} /> MY EXPERIENCE
            </div>
            <DotMatrixMap locations={profile.experience} showPath animate />
          </div>

          <TestimonialCard testimonials={profile.testimonials} />
        </div>
      </div>
    </PageTransition>
  );
}
