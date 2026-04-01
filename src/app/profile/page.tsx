"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/shared/PageTransition";
import IdentityCard from "@/components/profile/IdentityCard";
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

        {/* Bottom row placeholder - will be filled by Task 19 */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 2fr 1fr" }}>
          <div className="rounded-2xl border border-gray-100 bg-gray-900 p-6 text-white">
            <p className="text-xs text-gray-400">User Persona — Coming next</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-900 p-6 text-white">
            <p className="text-xs text-gray-400">Experience Map — Coming next</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <p className="text-xs text-gray-400">Testimonials — Coming next</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
