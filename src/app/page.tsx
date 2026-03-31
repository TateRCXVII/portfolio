"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeroCard from "@/components/dashboard/HeroCard";
import SkillMatrixCard from "@/components/dashboard/SkillMatrixCard";
import TimeSpentCard from "@/components/dashboard/TimeSpentCard";
import WorkShowcaseCard from "@/components/dashboard/WorkShowcaseCard";
import ExperienceMapCard from "@/components/dashboard/ExperienceMapCard";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import PageTransition from "@/components/shared/PageTransition";
import Terminal from "@/components/terminal/Terminal";

export default function DashboardPage() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <>
    <PageTransition className="min-h-screen bg-dark-bg pt-20">
      <motion.div
        className="mx-auto grid max-w-[1400px] gap-4 p-6"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gridTemplateAreas: `
            "hero time skills"
            "showcase showcase map"
          `,
          minHeight: "calc(100vh - 80px)",
        }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp} style={{ gridArea: "hero" }}>
          <HeroCard onOpenTerminal={() => setTerminalOpen(true)} />
        </motion.div>

        <motion.div variants={fadeInUp} style={{ gridArea: "time" }}>
          <TimeSpentCard />
        </motion.div>

        <motion.div variants={fadeInUp} style={{ gridArea: "skills" }}>
          <SkillMatrixCard />
        </motion.div>

        <motion.div variants={fadeInUp} style={{ gridArea: "showcase" }}>
          <WorkShowcaseCard />
        </motion.div>

        <motion.div variants={fadeInUp} style={{ gridArea: "map" }}>
          <ExperienceMapCard />
        </motion.div>
      </motion.div>
    </PageTransition>
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
