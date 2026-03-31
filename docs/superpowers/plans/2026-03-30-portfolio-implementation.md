# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a highly interactive portfolio website for Tate Reynolds (Software Engineer) with 6 routes: dark dashboard with bento cards, project gallery with grid/list toggle, expanded project detail, 3D book case study library, PDF-style case study reader, and a profile page — all with rich hover/click animations and an interactive terminal overlay.

**Architecture:** Next.js 15 App Router with static generation. All content in TypeScript data files for easy customization. Shared layout with animated pill nav. Framer Motion for all page transitions and micro-interactions. CSS 3D transforms for the book shelf. Custom terminal component with plugin-style command registry.

**Tech Stack:** Next.js 15, Tailwind CSS 4, Framer Motion, Lucide React, D3.js (charts), custom SVG (maps), TypeScript

---

## Phase 1: Scaffolding & Shared Layout

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/styles/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Create Next.js project with Tailwind**

```bash
cd /Users/e165072/code/personal/portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Expected: Project scaffolded with all config files.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/e165072/code/personal/portfolio
npm install framer-motion lucide-react d3@7
npm install -D @types/d3
```

- [ ] **Step 3: Configure fonts in layout**

Replace the contents of `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Tate Reynolds — Software Engineer",
  description: "Portfolio of Tate Reynolds, Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Set up global CSS**

Replace the contents of `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;

  --color-dark-bg: #0a0a0a;
  --color-dark-card: #141414;
  --color-dark-border: #222222;
  --color-dark-text: #e5e5e5;
  --color-dark-muted: #888888;
  --color-accent-green: #22c55e;
  --color-accent-pink: #ec4899;
  --color-accent-blue: #3b82f6;
  --color-accent-yellow: #eab308;
  --color-status-shipped: #22c55e;
  --color-status-concept: #ec4899;
  --color-status-live: #eab308;
}

html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
}

::selection {
  background-color: rgba(34, 197, 94, 0.3);
}
```

- [ ] **Step 5: Verify dev server runs**

```bash
cd /Users/e165072/code/personal/portfolio
npm run dev
```

Expected: Server starts on localhost:3000 with default Next.js page.

- [ ] **Step 6: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, Framer Motion, fonts"
```

---

### Task 2: Shared Navbar Component

**Files:**
- Create: `src/components/nav/Navbar.tsx`
- Create: `src/components/nav/NavPill.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create NavPill component**

Create `src/components/nav/NavPill.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavPillProps {
  href: string;
  label: string;
  isActive: boolean;
}

export default function NavPill({ href, label, isActive }: NavPillProps) {
  return (
    <Link href={href} className="relative px-5 py-2 text-sm font-medium">
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-black"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <motion.span
        className={`relative z-10 transition-colors duration-200 ${
          isActive ? "text-white" : "text-gray-600 hover:text-black"
        }`}
        whileHover={{ scale: 1.05 }}
      >
        {label}
      </motion.span>
    </Link>
  );
}
```

- [ ] **Step 2: Create Navbar component**

Create `src/components/nav/Navbar.tsx`:

```tsx
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

  // Dashboard is dark theme
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
      {/* Logo */}
      <Link href="/" className="text-sm font-semibold tracking-wider">
        TATE REYNOLDS
      </Link>

      {/* Nav Pills */}
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
          />
        ))}
      </nav>

      {/* Right icons */}
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
```

- [ ] **Step 3: Wire Navbar into layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Tate Reynolds — Software Engineer",
  description: "Portfolio of Tate Reynolds, Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create placeholder page**

Replace `src/app/page.tsx`:

```tsx
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-bg text-dark-text">
      <h1 className="font-mono text-4xl">Hello Stranger</h1>
    </div>
  );
}
```

- [ ] **Step 5: Verify navbar renders with active pill animation**

```bash
cd /Users/e165072/code/personal/portfolio
npm run dev
```

Open http://localhost:3000. Expect: Navbar at top with "TATE REYNOLDS" left, pill nav center (Dashboard active with black pill), gradient logo right. Dark background with "Hello Stranger" centered.

- [ ] **Step 6: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/nav/Navbar.tsx src/components/nav/NavPill.tsx src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add shared Navbar with animated pill navigation"
```

---

### Task 3: Animation Utilities & Page Transition Wrapper

**Files:**
- Create: `src/lib/animations.ts`
- Create: `src/components/shared/PageTransition.tsx`

- [ ] **Step 1: Create shared animation variants**

Create `src/lib/animations.ts`:

```ts
import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02, y: -4 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const cardLift = {
  whileHover: {
    y: -8,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};
```

- [ ] **Step 2: Create PageTransition wrapper**

Create `src/components/shared/PageTransition.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/lib/animations.ts src/components/shared/PageTransition.tsx
git commit -m "feat: add shared animation variants and page transition wrapper"
```

---

## Phase 2: Data Layer

### Task 4: Create All Data Files

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/case-studies.ts`
- Create: `src/data/profile.ts`

- [ ] **Step 1: Create type definitions**

Create `src/data/types.ts`:

```ts
export interface Project {
  slug: string;
  name: string;
  category: "dashboard" | "app" | "website" | "visual" | "fun";
  company?: string;
  status: "shipped" | "concept" | "live-demo";
  updatedAt: string;
  description: string;
  thumbnail: string;
  images: string[];
  featured?: boolean;
  overview: {
    type: string;
    role: string;
    tool: string;
    contribution: string;
  };
  snapshot: {
    goal: string;
    challenge: string;
    outcome: string;
  };
  designFocus: {
    label: string;
    leftLabel: string;
    rightLabel: string;
    current: number;
    target: number;
  }[];
  analogous?: {
    title: string;
    image: string;
    pros: string;
    cons: string;
  }[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle?: string;
  bookColor: {
    spine: string;
    cover: string;
    accent: string;
    pages: string;
  };
  coverArt: string;
  toc: {
    section: string;
    title: string;
    subsections: { id: string; title: string; page: number }[];
  }[];
  content: {
    id: string;
    heading: string;
    body: string;
    images?: string[];
  }[];
}

export interface Profile {
  name: string;
  title: string;
  hoursSpent: number;
  identityCards: {
    icon: string;
    description: string;
    tags: string[];
    label: string;
    backContent: string;
  }[];
  persona: { axis: string; value: number }[];
  goals: string[];
  experience: {
    city: string;
    lat: number;
    lng: number;
    label: string;
  }[];
  testimonials: {
    name: string;
    title: string;
    company: string;
    quote: string;
  }[];
  skills: { name: string; score: number }[];
  tools: string[];
}

export type ViewMode = "grid" | "list";
export type ProjectCategory = Project["category"] | "all";
```

- [ ] **Step 2: Create projects data**

Create `src/data/projects.ts`:

```ts
import { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "signal",
    name: "Signal",
    category: "dashboard",
    company: "Bolster",
    status: "shipped",
    updatedAt: "08/28/2025",
    featured: true,
    description:
      "Signal is an AI-powered cybersecurity platform that transforms complex threat data into a clear story, mapping attacks from detection to takedown so analysts and executives can act with confidence.",
    thumbnail: "/images/projects/signal-thumb.png",
    images: ["/images/projects/signal-1.png", "/images/projects/signal-2.png"],
    overview: {
      type: "SaaS Product Design",
      role: "Project Lead",
      tool: "Figma",
      contribution:
        "Defined workflows, led product vision, and drove design direction.",
    },
    snapshot: {
      goal: "Redesign the Web Dashboard to expose, aggregate, and highlight critical data in a unified, configurable view, enabling users to monitor, share, report, and track threats.",
      challenge:
        "Complex data from multiple sources needed to be unified without overwhelming users or losing granularity.",
      outcome:
        "Delivered a configurable dashboard that reduced analyst workflow time by 40% and improved executive visibility into threat landscapes.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.3, target: 0.85 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.4, target: 0.75 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.2, target: 0.8 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.25, target: 0.85 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.15, target: 0.9 },
    ],
    analogous: [
      {
        title: "Cyberthreat Live Map",
        image: "/images/projects/analogous-cybermap.png",
        pros: "Provides real-time attack tracking, enhancing transparency and offering insight into attack volume.",
        cons: "The dark, tech-heavy interface can feel overwhelming and ominous, with no clear explanations to help the audience understand what's happening.",
      },
      {
        title: "Ekata Identity Engine",
        image: "/images/projects/analogous-ekata.png",
        pros: "Interactive and scalable, offering multiple views to effectively visualize the data.",
        cons: "Needs explanation for better comprehension.",
      },
    ],
  },
  {
    slug: "bolster-ai",
    name: "Bolster AI",
    category: "dashboard",
    company: "Bolster",
    status: "concept",
    updatedAt: "08/18/2024",
    description:
      "AI-powered brand and domain protection platform with real-time scanning and threat detection.",
    thumbnail: "/images/projects/bolster-thumb.png",
    images: [],
    overview: {
      type: "SaaS Dashboard",
      role: "Senior Designer",
      tool: "Figma",
      contribution: "Led redesign of core analytics views.",
    },
    snapshot: {
      goal: "Modernize the analytics dashboard for faster threat identification.",
      challenge: "Legacy UI patterns slowed down analyst workflows.",
      outcome: "Proposed new design system reducing cognitive load by 35%.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.4, target: 0.8 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.3, target: 0.7 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.3, target: 0.75 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.35, target: 0.8 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.2, target: 0.85 },
    ],
  },
  {
    slug: "takedown-visibility",
    name: "Takedown Visibility Center",
    category: "dashboard",
    company: "Bolster",
    status: "shipped",
    updatedAt: "11/05/2025",
    description:
      "Centralized visibility into takedown operations across all attack vectors.",
    thumbnail: "/images/projects/takedown-thumb.png",
    images: [],
    overview: {
      type: "SaaS Dashboard",
      role: "Lead Designer",
      tool: "Figma",
      contribution: "Designed end-to-end takedown tracking workflow.",
    },
    snapshot: {
      goal: "Provide a single pane of glass for all takedown operations.",
      challenge: "Data spread across multiple tools with no unified view.",
      outcome: "Shipped unified dashboard used by 200+ analysts daily.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.35, target: 0.9 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.5, target: 0.8 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.4, target: 0.85 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.2, target: 0.9 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.3, target: 0.85 },
    ],
  },
  {
    slug: "checkphish-ai",
    name: "CheckPhish AI",
    category: "dashboard",
    company: "Bolster",
    status: "shipped",
    updatedAt: "04/23/2024",
    description: "Free phishing URL scanner and brand monitoring tool.",
    thumbnail: "/images/projects/checkphish-thumb.png",
    images: [],
    overview: {
      type: "SaaS Tool",
      role: "Product Designer",
      tool: "Figma",
      contribution: "Redesigned scanning interface and results display.",
    },
    snapshot: {
      goal: "Make phishing detection accessible to non-technical users.",
      challenge: "Technical results needed to be understandable by anyone.",
      outcome: "Increased user engagement by 60% after redesign.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.5, target: 0.9 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.3, target: 0.9 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.4, target: 0.7 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.5, target: 0.8 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.4, target: 0.85 },
    ],
  },
  {
    slug: "abuse-mailbox",
    name: "Abuse Mailbox",
    category: "dashboard",
    company: "Bolster",
    status: "shipped",
    updatedAt: "10/25/2024",
    description:
      "Automated abuse mailbox processing with AI-powered threat classification.",
    thumbnail: "/images/projects/abuse-thumb.png",
    images: [],
    overview: {
      type: "SaaS Dashboard",
      role: "Senior Designer",
      tool: "Figma",
      contribution: "Designed automated triage workflow.",
    },
    snapshot: {
      goal: "Automate abuse report processing to reduce manual triage time.",
      challenge: "High volume of reports with varying formats and severity.",
      outcome: "Reduced manual triage time by 75% through automation.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.3, target: 0.8 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.4, target: 0.7 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.35, target: 0.8 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.3, target: 0.85 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.25, target: 0.8 },
    ],
  },
  {
    slug: "lestyle-ai",
    name: "LiStyle AI",
    category: "app",
    status: "concept",
    updatedAt: "06/08/2022",
    description:
      "AI-powered personal styling app that recommends outfits based on wardrobe and preferences.",
    thumbnail: "/images/projects/lestyle-thumb.png",
    images: [],
    overview: {
      type: "Mobile App",
      role: "Product Designer",
      tool: "Figma",
      contribution: "Designed full app experience from onboarding to daily use.",
    },
    snapshot: {
      goal: "Help users make outfit decisions faster with AI suggestions.",
      challenge: "Personalization required understanding individual style preferences.",
      outcome: "Created a concept that scored 4.5/5 in user testing sessions.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.5, target: 0.85 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.6, target: 0.95 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.3, target: 0.85 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.4, target: 0.8 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.5, target: 0.8 },
    ],
  },
  {
    slug: "bolster-website",
    name: "Bolster AI Website",
    category: "website",
    company: "Bolster",
    status: "concept",
    updatedAt: "06/23/2023",
    description:
      "Marketing website redesign for AI-powered brand protection platform.",
    thumbnail: "/images/projects/bolster-web-thumb.png",
    images: [],
    overview: {
      type: "Marketing Website",
      role: "Designer",
      tool: "Figma",
      contribution: "Led visual design for the marketing site refresh.",
    },
    snapshot: {
      goal: "Create a modern web presence that communicates Bolster's AI capabilities.",
      challenge: "Balancing technical credibility with approachable design.",
      outcome: "Delivered concept that increased demo request conversions.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.4, target: 0.85 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.3, target: 0.85 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.2, target: 0.7 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.5, target: 0.8 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.5, target: 0.8 },
    ],
  },
  {
    slug: "popmart",
    name: "POPMART",
    category: "website",
    status: "live-demo",
    updatedAt: "03/29/2022",
    description:
      "E-commerce experience redesign for collectible toy brand with playful interactions.",
    thumbnail: "/images/projects/popmart-thumb.png",
    images: [],
    overview: {
      type: "E-commerce Website",
      role: "Frontend Developer",
      tool: "HTML/CSS/JS",
      contribution: "Built interactive product showcase with animations.",
    },
    snapshot: {
      goal: "Create an engaging online shopping experience that matches the playful brand identity.",
      challenge: "Making product browsing feel as exciting as in-store discovery.",
      outcome: "Live demo with 3D product viewers and animated transitions.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.5, target: 0.8 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.7, target: 0.95 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.3, target: 0.9 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.4, target: 0.75 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.6, target: 0.8 },
    ],
  },
  {
    slug: "viewing-rooms",
    name: "Viewing Rooms",
    category: "website",
    status: "shipped",
    updatedAt: "01/15/2023",
    description: "Virtual gallery platform for art exhibitions, incubators, and artist projects.",
    thumbnail: "/images/projects/viewing-rooms-thumb.png",
    images: [],
    overview: {
      type: "Web Platform",
      role: "Full Stack Developer",
      tool: "React/Node.js",
      contribution: "Built virtual exhibition viewing experience.",
    },
    snapshot: {
      goal: "Enable art galleries to host virtual exhibitions online.",
      challenge: "Translating the physical gallery experience to digital.",
      outcome: "Platform used by 15+ galleries for virtual exhibitions.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.4, target: 0.8 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.5, target: 0.9 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.3, target: 0.85 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.4, target: 0.8 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.5, target: 0.75 },
    ],
  },
  {
    slug: "brand-protection",
    name: "Brand & Domain Protection",
    category: "website",
    company: "Bolster",
    status: "shipped",
    updatedAt: "09/12/2024",
    description: "AI-powered brand and domain protection marketing page.",
    thumbnail: "/images/projects/brand-protect-thumb.png",
    images: [],
    overview: {
      type: "Marketing Website",
      role: "Designer & Developer",
      tool: "Figma/Next.js",
      contribution: "Designed and built landing page with interactive demos.",
    },
    snapshot: {
      goal: "Showcase Bolster's brand protection capabilities to potential customers.",
      challenge: "Communicating complex security concepts to business decision makers.",
      outcome: "Launched page that doubled demo request rate.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.4, target: 0.85 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.3, target: 0.85 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.3, target: 0.7 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.5, target: 0.8 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.4, target: 0.8 },
    ],
  },
  {
    slug: "data-art-1",
    name: "Generative Data Art I",
    category: "visual",
    status: "shipped",
    updatedAt: "02/14/2023",
    description: "Generative art experiments using real-time data feeds.",
    thumbnail: "/images/projects/data-art-1-thumb.png",
    images: [],
    overview: {
      type: "Visual Art",
      role: "Creative Developer",
      tool: "p5.js/D3",
      contribution: "Created generative art pieces from live data streams.",
    },
    snapshot: {
      goal: "Explore the intersection of data and visual art.",
      challenge: "Making abstract data feel emotional and engaging.",
      outcome: "Series exhibited at local design showcase.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.2, target: 0.6 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.5, target: 0.8 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.4, target: 0.9 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.6, target: 0.7 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.3, target: 0.7 },
    ],
  },
  {
    slug: "data-art-2",
    name: "Generative Data Art II",
    category: "visual",
    status: "shipped",
    updatedAt: "07/20/2023",
    description: "Second series of generative art exploring network topologies.",
    thumbnail: "/images/projects/data-art-2-thumb.png",
    images: [],
    overview: {
      type: "Visual Art",
      role: "Creative Developer",
      tool: "p5.js/Three.js",
      contribution: "Built interactive 3D network visualizations.",
    },
    snapshot: {
      goal: "Visualize network relationships as interactive art.",
      challenge: "Performance optimization for real-time 3D rendering.",
      outcome: "Interactive pieces with 60fps performance on mobile.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.3, target: 0.65 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.4, target: 0.75 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.5, target: 0.95 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.5, target: 0.7 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.4, target: 0.7 },
    ],
  },
  {
    slug: "portfolio-site",
    name: "This Portfolio",
    category: "fun",
    status: "live-demo",
    updatedAt: "03/30/2026",
    description: "The portfolio you're looking at right now. Meta, right?",
    thumbnail: "/images/projects/portfolio-thumb.png",
    images: [],
    overview: {
      type: "Personal Website",
      role: "Designer & Developer",
      tool: "Next.js/Tailwind",
      contribution: "Designed and built from scratch.",
    },
    snapshot: {
      goal: "Create a portfolio that's as interactive as the work it showcases.",
      challenge: "Balancing visual complexity with performance.",
      outcome: "You're looking at it.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.5, target: 0.9 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.4, target: 0.85 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.2, target: 0.95 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.3, target: 0.9 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.5, target: 0.85 },
    ],
  },
  {
    slug: "cli-game",
    name: "Terminal Adventure",
    category: "fun",
    status: "concept",
    updatedAt: "12/01/2024",
    description: "A text-based adventure game built entirely in the terminal.",
    thumbnail: "/images/projects/cli-game-thumb.png",
    images: [],
    overview: {
      type: "CLI Application",
      role: "Developer",
      tool: "Node.js",
      contribution: "Built game engine and narrative system.",
    },
    snapshot: {
      goal: "Create an engaging narrative experience in the terminal.",
      challenge: "Making text-only gameplay feel immersive.",
      outcome: "Working prototype with branching storylines.",
    },
    designFocus: [
      { label: "Clarity Level", leftLabel: "Low", rightLabel: "High", current: 0.6, target: 0.8 },
      { label: "Audience", leftLabel: "Technical-Only", rightLabel: "Accessible", current: 0.2, target: 0.6 },
      { label: "Interaction", leftLabel: "Static", rightLabel: "Dynamic", current: 0.3, target: 0.9 },
      { label: "Architecture", leftLabel: "Fragmented", rightLabel: "Connected", current: 0.5, target: 0.85 },
      { label: "Transparency", leftLabel: "Black Box", rightLabel: "Transparent", current: 0.4, target: 0.7 },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

export const categoryLabels: Record<string, string> = {
  all: "All",
  dashboard: "Dashboard",
  app: "App",
  website: "Website",
  visual: "Visual",
  fun: "4 Fun",
};

export const categoryCounts: Record<string, number> = Object.fromEntries(
  Object.keys(categoryLabels).map((cat) => [
    cat,
    cat === "all" ? projects.length : projects.filter((p) => p.category === cat).length,
  ])
);
```

- [ ] **Step 3: Create case studies data**

Create `src/data/case-studies.ts`:

```ts
import { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "edge-case",
    title: "How I Make Use of Edge Case",
    bookColor: {
      spine: "#ef4444",
      cover: "#f9a8d4",
      accent: "#16a34a",
      pages: "#fef2f2",
    },
    coverArt: "edge-case",
    toc: [
      {
        section: "01",
        title: "CONTEXT",
        subsections: [
          { id: "background", title: "Background", page: 1 },
          { id: "metric", title: "Metric", page: 2 },
        ],
      },
      {
        section: "02",
        title: "PROCESS",
        subsections: [
          { id: "define-problem", title: "Define the Problem", page: 3 },
          { id: "design-audit", title: "Design Audit", page: 5 },
          { id: "design-process", title: "Design Process", page: 6 },
        ],
      },
      {
        section: "03",
        title: "RESULT",
        subsections: [
          { id: "user-flow", title: "User Flow Improvement", page: 9 },
          { id: "web-experience", title: "Web Experience Improvement", page: 11 },
          { id: "impact", title: "Impact", page: 12 },
          { id: "takeaway", title: "Takeaway", page: 14 },
        ],
      },
    ],
    content: [
      {
        id: "background",
        heading: "01.1 / Background",
        body: "Edge cases are often overlooked in the design process, treated as exceptions rather than opportunities. This case study explores how embracing edge cases led to more robust and inclusive design solutions.",
      },
      {
        id: "metric",
        heading: "01.2 / Metric",
        body: "Key metrics tracked: error rate reduction, user satisfaction scores, and task completion rates across diverse user scenarios.",
      },
      {
        id: "define-problem",
        heading: "02.1 / Define the Problem",
        body: "Users encountered unexpected states that the original design didn't account for, leading to confusion and support tickets. The challenge was to systematically identify and design for these scenarios.",
      },
      {
        id: "design-audit",
        heading: "02.2 / Design Audit",
        body: "Conducted a comprehensive audit of all user flows, identifying 47 edge cases across 12 key workflows. Categorized by severity and frequency of occurrence.",
      },
      {
        id: "design-process",
        heading: "02.3 / Design Process",
        body: "Developed a framework for edge case discovery: user interviews, error log analysis, and systematic boundary testing. Created design patterns for each category of edge case.",
      },
      {
        id: "user-flow",
        heading: "03.1 / User Flow Improvement",
        body: "Redesigned 12 critical user flows with explicit edge case handling. Added graceful degradation patterns and informative error states.",
      },
      {
        id: "web-experience",
        heading: "03.2 / Web Experience Improvement",
        body: "Implemented responsive edge case handling that adapts to network conditions, device capabilities, and user context.",
      },
      {
        id: "impact",
        heading: "03.3 / Impact",
        body: "Support tickets reduced by 60%. User satisfaction increased from 3.2 to 4.6 out of 5. Task completion rate improved from 78% to 95%.",
      },
      {
        id: "takeaway",
        heading: "03.4 / Takeaway",
        body: "Edge cases aren't exceptions — they're opportunities to demonstrate care for your users. The best designs anticipate the unexpected.",
      },
    ],
  },
  {
    slug: "visualize-data",
    title: "Data Visualization or Visualize Data?",
    bookColor: {
      spine: "#171717",
      cover: "#f5f5f5",
      accent: "#000000",
      pages: "#e5e5e5",
    },
    coverArt: "data-viz",
    toc: [
      {
        section: "01",
        title: "CONTEXT",
        subsections: [
          { id: "background", title: "Background", page: 1 },
          { id: "research", title: "Research", page: 2 },
        ],
      },
      {
        section: "02",
        title: "PROCESS",
        subsections: [
          { id: "exploration", title: "Visual Exploration", page: 4 },
          { id: "iteration", title: "Iteration", page: 6 },
        ],
      },
      {
        section: "03",
        title: "RESULT",
        subsections: [
          { id: "final-design", title: "Final Design", page: 8 },
          { id: "takeaway", title: "Takeaway", page: 10 },
        ],
      },
    ],
    content: [
      {
        id: "background",
        heading: "01.1 / Background",
        body: "The distinction between data visualization and visualizing data may seem semantic, but it represents a fundamental shift in how we approach information design.",
      },
      {
        id: "research",
        heading: "01.2 / Research",
        body: "Analyzed 50+ data visualization examples across industries to identify patterns in what makes data truly comprehensible versus merely presentable.",
      },
      {
        id: "exploration",
        heading: "02.1 / Visual Exploration",
        body: "Experimented with various chart types, interaction patterns, and visual encodings to find the most intuitive representations for complex datasets.",
      },
      {
        id: "iteration",
        heading: "02.2 / Iteration",
        body: "Through 8 rounds of user testing, refined the visual language to balance aesthetic appeal with cognitive clarity.",
      },
      {
        id: "final-design",
        heading: "03.1 / Final Design",
        body: "Developed a design system for data visualization that prioritizes progressive disclosure and contextual detail on demand.",
      },
      {
        id: "takeaway",
        heading: "03.2 / Takeaway",
        body: "The best data visualizations don't just show data — they tell stories. Design for understanding, not just display.",
      },
    ],
  },
  {
    slug: "misuse-rate",
    title: "Reducing an 90% Misuse Rate into Nearly Zero Errors",
    subtitle: "From 90% Misuse Rate to 0 Error",
    bookColor: {
      spine: "#2563eb",
      cover: "#2563eb",
      accent: "#f97316",
      pages: "#dbeafe",
    },
    coverArt: "misuse-rate",
    toc: [
      {
        section: "01",
        title: "CONTEXT",
        subsections: [
          { id: "background", title: "Background", page: 1 },
          { id: "metric", title: "Metric", page: 2 },
        ],
      },
      {
        section: "02",
        title: "PROCESS",
        subsections: [
          { id: "define-problem", title: "Define the Problem", page: 3 },
          { id: "design-audit", title: "Design Audit", page: 5 },
          { id: "design-process", title: "Design Process", page: 6 },
        ],
      },
      {
        section: "03",
        title: "RESULT",
        subsections: [
          { id: "user-flow", title: "User Flow Improvement", page: 9 },
          { id: "web-experience", title: "Web Experience Improvement", page: 11 },
          { id: "impact", title: "Impact", page: 12 },
          { id: "takeaway", title: "Takeaway", page: 14 },
        ],
      },
    ],
    content: [
      {
        id: "background",
        heading: "01.1 / Background",
        body: "A critical enterprise tool had a 90% misuse rate — users were consistently using features incorrectly, leading to data errors and lost productivity.",
      },
      {
        id: "metric",
        heading: "01.2 / Metric",
        body: "Tracked misuse rate, error recovery time, and user confidence scores across 500+ daily active users.",
      },
      {
        id: "define-problem",
        heading: "02.1 / Define the Problem",
        body: "Through user interviews and session recordings, identified that the root cause wasn't user error — it was design error. The interface invited mistakes.",
      },
      {
        id: "design-audit",
        heading: "02.2 / Design Audit",
        body: "Mapped every interaction point where misuse occurred. Found that 80% of errors came from just 3 confusing interface patterns.",
      },
      {
        id: "design-process",
        heading: "02.3 / Design Process",
        body: "Redesigned the 3 critical patterns using progressive disclosure, inline validation, and contextual guidance. Each iteration was tested with real users.",
      },
      {
        id: "user-flow",
        heading: "03.1 / User Flow Improvement",
        body: "Simplified the primary workflow from 12 steps to 5. Added real-time validation that catches errors before submission.",
      },
      {
        id: "web-experience",
        heading: "03.2 / Web Experience Improvement",
        body: "Introduced contextual help panels, smart defaults, and undo capabilities that reduced the consequences of remaining errors.",
      },
      {
        id: "impact",
        heading: "03.3 / Impact",
        body: "Misuse rate dropped from 90% to under 2%. Support tickets reduced by 85%. User confidence scores increased from 2.1 to 4.8 out of 5.",
      },
      {
        id: "takeaway",
        heading: "03.4 / Takeaway",
        body: "When 90% of users make the same mistake, the design is the bug. Fix the design, not the users.",
      },
    ],
  },
  {
    slug: "right-problem",
    title: "Solve the Right Problem",
    bookColor: {
      spine: "#eab308",
      cover: "#fce7f3",
      accent: "#3b82f6",
      pages: "#fef9c3",
    },
    coverArt: "right-problem",
    toc: [
      {
        section: "01",
        title: "CONTEXT",
        subsections: [
          { id: "background", title: "Background", page: 1 },
          { id: "hypothesis", title: "Hypothesis", page: 2 },
        ],
      },
      {
        section: "02",
        title: "PROCESS",
        subsections: [
          { id: "discovery", title: "Discovery", page: 3 },
          { id: "reframe", title: "Reframing the Problem", page: 5 },
        ],
      },
      {
        section: "03",
        title: "RESULT",
        subsections: [
          { id: "solution", title: "The Real Solution", page: 7 },
          { id: "takeaway", title: "Takeaway", page: 9 },
        ],
      },
    ],
    content: [
      {
        id: "background",
        heading: "01.1 / Background",
        body: "The team was asked to redesign a search feature that users complained was 'too slow.' But was speed really the problem?",
      },
      {
        id: "hypothesis",
        heading: "01.2 / Hypothesis",
        body: "Initial hypothesis: users need faster search results. After research: users actually needed better search relevance and filtering.",
      },
      {
        id: "discovery",
        heading: "02.1 / Discovery",
        body: "Conducted contextual inquiry sessions revealing that users weren't frustrated by speed — they were frustrated by irrelevant results that forced multiple search attempts.",
      },
      {
        id: "reframe",
        heading: "02.2 / Reframing the Problem",
        body: "Shifted the brief from 'make search faster' to 'help users find what they need on the first try.' This reframing opened entirely different solution spaces.",
      },
      {
        id: "solution",
        heading: "03.1 / The Real Solution",
        body: "Designed a faceted search with smart suggestions, recent history, and contextual filters. Search time actually increased slightly — but user satisfaction doubled.",
      },
      {
        id: "takeaway",
        heading: "03.2 / Takeaway",
        body: "The most dangerous thing in design is solving the wrong problem efficiently. Always question the brief before designing the solution.",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
```

- [ ] **Step 4: Create profile data**

Create `src/data/profile.ts`:

```ts
import { Profile } from "./types";

export const profile: Profile = {
  name: "Tate Reynolds",
  title: "Software Engineer",
  hoursSpent: 14238,
  identityCards: [
    {
      icon: "Palette",
      description:
        "From art spaces to digital systems, I'm drawn to how form and function work together to create thoughtful design. Each project is a balance between intuition and structure.",
      tags: ["Installation Art", "Curation", "Visual Art Management"],
      label: "Inspired by Art",
      backContent:
        "Art taught me that constraints breed creativity. Every technical limitation is a design opportunity waiting to be discovered.",
    },
    {
      icon: "Code2",
      description:
        "I translate design into interaction, turning ideas into responsive, living experiences through modern web technology.",
      tags: ["HTML", "CSS", "JavaScript", "jQuery"],
      label: "Curiosity = Dev",
      backContent:
        "The best code is invisible — users should feel the experience, not see the implementation. I build with empathy.",
    },
    {
      icon: "MousePointer",
      description:
        "In a technical world, I design for clarity, transforming intricate systems into intuitive experiences grounded in logic and precision.",
      tags: ["Data Visualization", "SaaS", "Research"],
      label: "Product Designer",
      backContent:
        "Design is not decoration — it's problem solving. I measure success by how effortlessly users achieve their goals.",
    },
    {
      icon: "PersonStanding",
      description:
        "I move through products like everyone else, noticing what works, what slows me down, and how design could make life flow a little easier.",
      tags: ["Comfort Seek", "Picky", "Everyday User"],
      label: "People",
      backContent:
        "Being a demanding user makes me a better designer. I notice friction because I feel it myself.",
    },
  ],
  persona: [
    { axis: "Empathetic", value: 85 },
    { axis: "Adaptable", value: 75 },
    { axis: "Creative", value: 90 },
    { axis: "Curious", value: 95 },
    { axis: "Detail-focused", value: 80 },
  ],
  goals: [
    "Designs logic with empathy",
    "Finds beauty in systems",
    "Where technology becomes intuitive",
  ],
  experience: [
    { city: "Boston", lat: 42.3601, lng: -71.0589, label: "42.3601° N, 71.0589° W" },
    { city: "New York", lat: 40.7128, lng: -74.006, label: "40.7128° N, 74.0060° W" },
    { city: "San Francisco", lat: 37.7749, lng: -122.4194, label: "37.7749° N, 122.4194° W" },
    { city: "Shanghai", lat: 31.2989, lng: 120.5853, label: "31.2989° N, 120.5853° E" },
  ],
  testimonials: [
    {
      name: "Director of Product Management",
      title: "SaaS Platform",
      company: "Bolster",
      quote:
        "Tate did some very strong product design work while keeping user needs and business goals top-of-mind.",
    },
    {
      name: "VP of AI Research",
      title: "SaaS Platform",
      company: "Bolster",
      quote:
        "I appreciated how Tate asked thoughtful questions and had a knack for spotting potential issues earlier rather than later.",
    },
    {
      name: "VP of Design",
      title: "Enterprise Software",
      company: "Previous Co",
      quote:
        "He's especially good at communication and facilitates discussion between teams.",
    },
    {
      name: "Product Designer",
      title: "SaaS Platform",
      company: "Bolster",
      quote:
        "Tate has a good eye for visuals and nicely developed sense of design.",
    },
  ],
  skills: [
    { name: "Platform Design", score: 15 },
    { name: "Website Design", score: 12 },
    { name: "UI UX Design", score: 14 },
    { name: "Interaction Design", score: 11 },
    { name: "Design System", score: 10 },
    { name: "User Research", score: 8 },
    { name: "Usability Testing", score: 7 },
    { name: "Front-end Development", score: 9 },
    { name: "Prototyping", score: 8 },
    { name: "Data Visualization", score: 6 },
  ],
  tools: ["Figma", "ProtoP ie", "Framer", "JavaScript", "jQuery", "HTML", "CSS", "Adobe CC"],
};
```

- [ ] **Step 5: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/data/types.ts src/data/projects.ts src/data/case-studies.ts src/data/profile.ts
git commit -m "feat: add data layer with types, projects, case studies, and profile"
```

---

## Phase 3: Dashboard Page

### Task 5: Dashboard Layout & Hero Card

**Files:**
- Create: `src/components/dashboard/HeroCard.tsx`
- Create: `src/components/dashboard/MatrixRain.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create MatrixRain background component**

Create `src/components/dashboard/MatrixRain.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface MatrixRainProps {
  speed?: number;
}

export default function MatrixRain({ speed = 1 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    });
    resizeObserver.observe(parent);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 14;
    const columns = Math.floor(dimensions.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;':\",./<>?`~";

    let animationId: number;
    let lastTime = 0;
    const interval = 50 / speed;

    const draw = (time: number) => {
      if (time - lastTime < interval) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;

      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      ctx.fillStyle = "#22c55e";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.globalAlpha = Math.random() * 0.5 + 0.1;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > dimensions.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationId);
  }, [dimensions, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
```

- [ ] **Step 2: Create HeroCard component**

Create `src/components/dashboard/HeroCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MatrixRain from "./MatrixRain";

interface HeroCardProps {
  onOpenTerminal: () => void;
}

export default function HeroCard({ onOpenTerminal }: HeroCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layoutId="hero-card"
      className="relative cursor-pointer overflow-hidden rounded-2xl border border-dark-border bg-dark-card"
      style={{ gridArea: "hero" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenTerminal}
      whileHover={{
        boxShadow: "0 20px 60px -12px rgba(34, 197, 94, 0.15)",
        translateZ: 20,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <MatrixRain speed={isHovered ? 2.5 : 1} />

      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div>
          <motion.h1
            className="font-mono text-6xl font-bold leading-tight text-white"
            animate={{
              textShadow: isHovered
                ? "0 0 20px rgba(34, 197, 94, 0.5)"
                : "0 0 0px rgba(34, 197, 94, 0)",
            }}
            transition={{ duration: 0.3 }}
          >
            Hello
            <br />
            Stranger
          </motion.h1>
        </div>

        <motion.p
          className="font-mono text-sm text-dark-muted"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isHovered ? 1 : 0.6 }}
        >
          let stranger = user.current();{" "}
          <span className="text-accent-green">&gt;</span> The terminal is open.
          Type nothing. Just explore.
          <motion.span
            className="inline-block"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.53, repeat: Infinity, repeatType: "reverse" }}
          >
            _
          </motion.span>
        </motion.p>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Create dashboard page with bento grid**

Replace `src/app/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeroCard from "@/components/dashboard/HeroCard";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import PageTransition from "@/components/shared/PageTransition";

export default function DashboardPage() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
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

        {/* Placeholder cards — will be replaced in subsequent tasks */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-dark-border bg-dark-card p-6"
          style={{ gridArea: "time" }}
        >
          <p className="text-sm text-dark-muted">Time Spent — Coming next</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-dark-border bg-dark-card p-6"
          style={{ gridArea: "skills" }}
        >
          <p className="text-sm text-dark-muted">Skill Matrix — Coming next</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-dark-border bg-dark-card p-6"
          style={{ gridArea: "showcase" }}
        >
          <p className="text-sm text-dark-muted">Work Showcase — Coming next</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-dark-border bg-dark-card p-6"
          style={{ gridArea: "map" }}
        >
          <p className="text-sm text-dark-muted">Experience Map — Coming next</p>
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}
```

- [ ] **Step 4: Verify dashboard renders with hero card**

```bash
cd /Users/e165072/code/personal/portfolio
npm run dev
```

Open http://localhost:3000. Expect: Dark bento grid with 5 areas. Hero card (top-left) shows "Hello Stranger" with matrix rain background. Hover speeds up rain and adds glow. Other 4 cards show placeholder text.

- [ ] **Step 5: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/dashboard/HeroCard.tsx src/components/dashboard/MatrixRain.tsx src/app/page.tsx
git commit -m "feat: add dashboard bento grid layout with Hero card and matrix rain"
```

---

### Task 6: Time Spent Card with Animated Gauge

**Files:**
- Create: `src/components/dashboard/TimeSpentCard.tsx`
- Create: `src/components/shared/AnimatedCounter.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create AnimatedCounter component**

Create `src/components/shared/AnimatedCounter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  formatFn?: (val: number) => string;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  className = "",
  formatFn,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (latest) =>
    formatFn ? formatFn(Math.round(latest)) : Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
```

- [ ] **Step 2: Create TimeSpentCard component**

Create `src/components/dashboard/TimeSpentCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { profile } from "@/data/profile";

export default function TimeSpentCard() {
  const [isHovered, setIsHovered] = useState(false);

  // Gauge SVG params
  const cx = 150;
  const cy = 160;
  const r = 130;
  const startAngle = Math.PI;
  const endAngle = 0;
  const gaugeValue = 0.72; // Position on the gauge

  const describeArc = (start: number, end: number) => {
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArcFlag = end - start > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  const indicatorAngle = startAngle + (endAngle - startAngle) * gaugeValue;
  const indicatorX = cx + r * Math.cos(indicatorAngle);
  const indicatorY = cy + r * Math.sin(indicatorAngle);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <div className="mb-2 flex w-full items-center gap-2 text-xs text-dark-muted">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        ENGINEERING TIME SPENT
      </div>

      {/* Counter */}
      <div className="mb-2 text-center">
        <AnimatedCounter
          value={isHovered ? profile.hoursSpent : profile.hoursSpent}
          className="text-5xl font-bold text-white"
          duration={isHovered ? 0.8 : 2}
        />
        <p className="mt-1 text-lg text-dark-muted">Hours</p>
      </div>

      {/* Gauge */}
      <svg viewBox="0 0 300 180" className="w-full max-w-[260px]">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d={describeArc(startAngle, endAngle)}
          fill="none"
          stroke="#333"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Colored arc */}
        <motion.path
          d={describeArc(startAngle, indicatorAngle)}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Indicator dot */}
        <motion.circle
          cx={indicatorX}
          cy={indicatorY}
          r="8"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
        />

        {/* End dots */}
        <circle cx={cx - r} cy={cy} r="4" fill="#666" />
        <circle cx={cx + r} cy={cy} r="4" fill="#666" />

        {/* Labels */}
        <text x={cx - r + 20} y={cy + 25} fill="#888" fontSize="10" fontFamily="monospace">
          2020
        </text>
        <text x={cx - r + 15} y={cy + 38} fill="#666" fontSize="8" fontFamily="monospace">
          BOSTON
        </text>

        <text x={cx + r - 75} y={cy + 25} fill="#888" fontSize="10" fontFamily="monospace">
          2025
        </text>
        <text x={cx + r - 95} y={cy + 38} fill="#666" fontSize="8" fontFamily="monospace">
          SAN FRANCISCO
        </text>
      </svg>

      {/* Pulse glow on idle */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: [
            "inset 0 0 30px rgba(168, 85, 247, 0)",
            "inset 0 0 30px rgba(168, 85, 247, 0.05)",
            "inset 0 0 30px rgba(168, 85, 247, 0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
}
```

- [ ] **Step 3: Wire TimeSpentCard into dashboard**

In `src/app/page.tsx`, replace the time placeholder:

```tsx
// Add import at top
import TimeSpentCard from "@/components/dashboard/TimeSpentCard";

// Replace the time placeholder div with:
<motion.div variants={fadeInUp} style={{ gridArea: "time" }}>
  <TimeSpentCard />
</motion.div>
```

- [ ] **Step 4: Verify gauge renders with animation**

Open http://localhost:3000. Expect: Time Spent card shows animated counter counting up to 14,238. Gauge arc draws in with gradient. Hover causes counter to re-animate.

- [ ] **Step 5: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/dashboard/TimeSpentCard.tsx src/components/shared/AnimatedCounter.tsx src/app/page.tsx
git commit -m "feat: add Time Spent card with animated gauge and counter"
```

---

### Task 7: Skill Matrix Card

**Files:**
- Create: `src/components/dashboard/SkillMatrixCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create SkillMatrixCard component**

Create `src/components/dashboard/SkillMatrixCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { profile } from "@/data/profile";

// Color palette for skill bar segments
const skillColors = [
  "#22c55e", "#16a34a", "#15803d", "#4ade80", "#86efac",
  "#ec4899", "#d946ef", "#a855f7", "#f472b6", "#eab308",
];

export default function SkillMatrixCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; score: number } | null>(null);

  const totalScore = profile.skills.reduce((sum, s) => sum + s.score, 0);

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredSkill(null);
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 text-xs text-dark-muted">
        <BarChart3 size={14} />
        ENGINEERING SKILL MATRIX
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 gap-6">
        {/* Skills column */}
        <div className="flex-1">
          <p className="mb-2 text-xs font-semibold text-white">SKILL</p>
          <div className="space-y-1.5">
            {profile.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="flex cursor-pointer items-center justify-between text-sm"
                onMouseEnter={() => {
                  setHoveredSkill(i);
                  setTooltip({ name: skill.name, score: skill.score });
                }}
                onMouseLeave={() => {
                  setHoveredSkill(null);
                  setTooltip(null);
                }}
                animate={{
                  color: hoveredSkill === i ? "#fff" : "#aaa",
                }}
              >
                <span>{skill.name}</span>
                <motion.span
                  className="ml-2 rounded-full px-2 py-0.5 text-xs"
                  style={{
                    backgroundColor:
                      hoveredSkill === i
                        ? skillColors[i % skillColors.length]
                        : "transparent",
                    border: `1px solid ${skillColors[i % skillColors.length]}40`,
                  }}
                  animate={{
                    scale: hoveredSkill === i ? 1.1 : 1,
                  }}
                >
                  {isHovered ? (
                    <CountUp value={skill.score} />
                  ) : (
                    0
                  )}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools column */}
        <div className="w-24 text-right">
          <p className="mb-2 text-xs font-semibold text-white">TOOL</p>
          <div className="space-y-1.5">
            {profile.tools.map((tool) => (
              <motion.p
                key={tool}
                className="text-sm text-dark-muted"
                whileHover={{
                  color: "#fff",
                  textShadow: "0 0 8px rgba(255,255,255,0.3)",
                }}
              >
                {tool}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Comment text */}
      <div className="mt-4 text-right font-mono text-[10px] text-dark-muted">
        <p>// skill scores are self-assessed (total = {totalScore})</p>
        <p>// always iterating, always improving</p>
      </div>

      {/* Skill bar */}
      <div className="mt-3 flex h-6 w-full overflow-hidden rounded-sm">
        {profile.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="h-full"
            style={{
              width: `${(skill.score / totalScore) * 100}%`,
              backgroundColor: skillColors[i % skillColors.length],
            }}
            animate={{
              opacity: hoveredSkill !== null && hoveredSkill !== i ? 0.3 : 1,
              scaleY: hoveredSkill === i ? 1.3 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-20 left-6 rounded-lg bg-white px-3 py-2 text-xs text-black shadow-lg"
          >
            <p className="font-semibold">{tooltip.name}</p>
            <p>Score: {tooltip.score} / {totalScore}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useState(() => {
    let current = 0;
    const step = value / 20;
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setDisplay(Math.round(current));
    }, 50);
    return () => clearInterval(interval);
  });

  return <>{display}</>;
}
```

- [ ] **Step 2: Wire SkillMatrixCard into dashboard**

In `src/app/page.tsx`, replace the skills placeholder:

```tsx
// Add import at top
import SkillMatrixCard from "@/components/dashboard/SkillMatrixCard";

// Replace the skills placeholder div with:
<motion.div variants={fadeInUp} style={{ gridArea: "skills" }}>
  <SkillMatrixCard />
</motion.div>
```

- [ ] **Step 3: Verify skill matrix renders**

Open http://localhost:3000. Expect: Skill Matrix card with two columns (skills with badges, tools). Hovering a skill highlights it and the corresponding bar segment. Card hover triggers score count-up.

- [ ] **Step 4: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/dashboard/SkillMatrixCard.tsx src/app/page.tsx
git commit -m "feat: add Skill Matrix card with interactive hover highlighting"
```

---

### Task 8: Work Showcase Card (3D Room)

**Files:**
- Create: `src/components/dashboard/WorkShowcaseCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create WorkShowcaseCard component**

Create `src/components/dashboard/WorkShowcaseCard.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const floatingImages = [
  { src: "/images/projects/signal-thumb.png", x: -30, y: -20, z: 100, size: 120 },
  { src: "/images/projects/bolster-thumb.png", x: 60, y: 30, z: 200, size: 100 },
  { src: "/images/projects/checkphish-thumb.png", x: -50, y: 50, z: 150, size: 90 },
  { src: "/images/projects/lestyle-thumb.png", x: 40, y: -40, z: 250, size: 110 },
  { src: "/images/projects/popmart-thumb.png", x: -60, y: 10, z: 300, size: 80 },
  { src: "/images/projects/takedown-thumb.png", x: 20, y: 60, z: 180, size: 95 },
];

export default function WorkShowcaseCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [chatVisible, setChatVisible] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-dark-border bg-dark-card"
      onMouseMove={handleMouseMove}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: "1000px" }}
    >
      {/* Nested 3D room frames */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0.95, 0.8, 0.65, 0.5, 0.35].map((scale, i) => (
          <motion.div
            key={i}
            className="absolute border border-dark-border/30"
            style={{
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateX: mousePos.y * (i + 1) * -0.5,
              rotateY: mousePos.x * (i + 1) * 0.5,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          />
        ))}
      </div>

      {/* Floating project images */}
      {floatingImages.map((img, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg bg-dark-border/20 shadow-xl"
          style={{
            width: img.size,
            height: img.size * 0.65,
            left: `calc(50% + ${img.x}px)`,
            top: `calc(50% + ${img.y}px)`,
            transformStyle: "preserve-3d",
          }}
          animate={{
            x: mousePos.x * (img.z / 50),
            y: mousePos.y * (img.z / 50) + Math.sin(Date.now() / 1000 + i) * 3,
            rotateX: mousePos.y * -2,
            rotateY: mousePos.x * 2,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
            zIndex: 10,
          }}
        >
          {/* Placeholder gradient — replace with actual images when available */}
          <div className="h-full w-full rounded-lg bg-gradient-to-br from-dark-border to-dark-card" />
        </motion.div>
      ))}

      {/* Chat bubble */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          className="z-10 rounded-full bg-white/90 px-5 py-2.5 text-sm font-medium text-black shadow-lg backdrop-blur-sm"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -5px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatVisible(!chatVisible)}
        >
          Who are you?
        </motion.button>
      </div>

      {/* Typing response */}
      {chatVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 top-[58%] z-10 -translate-x-1/2 rounded-xl bg-dark-card/90 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-sm"
        >
          <TypewriterText text="I build things for the web." />
        </motion.div>
      )}
    </motion.div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");

  useState(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  });

  return (
    <span className="font-mono">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.53, repeat: Infinity, repeatType: "reverse" }}
      >
        |
      </motion.span>
    </span>
  );
}
```

- [ ] **Step 2: Wire WorkShowcaseCard into dashboard**

In `src/app/page.tsx`, replace the showcase placeholder:

```tsx
// Add import at top
import WorkShowcaseCard from "@/components/dashboard/WorkShowcaseCard";

// Replace the showcase placeholder div with:
<motion.div variants={fadeInUp} style={{ gridArea: "showcase" }}>
  <WorkShowcaseCard />
</motion.div>
```

- [ ] **Step 3: Verify 3D room renders with parallax**

Open http://localhost:3000. Expect: Large card with nested rectangular frames creating depth. Floating images shift with mouse. "Who are you?" bubble in center. Click shows typewriter response.

- [ ] **Step 4: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/dashboard/WorkShowcaseCard.tsx src/app/page.tsx
git commit -m "feat: add Work Showcase card with 3D parallax room and chat bubble"
```

---

### Task 9: Experience Map Card (Dot Matrix World Map)

**Files:**
- Create: `src/components/shared/DotMatrixMap.tsx`
- Create: `src/components/dashboard/ExperienceMapCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create DotMatrixMap component**

Create `src/components/shared/DotMatrixMap.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Simplified world map coordinates — dots at grid positions that form continent shapes
// Each dot is [longitude, latitude] mapped to SVG x,y
// This is a simplified representation — enough to be recognizable

const DOT_SIZE = 2.5;
const DOT_GAP = 8;
const MAP_WIDTH = 500;
const MAP_HEIGHT = 300;

// Convert lat/lng to SVG x/y using Mercator-like projection
function latLngToXY(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return { x, y };
}

// Generate dot grid — only show dots that fall on "land"
// Using a simplified bitmask approach — define rough continental bounds
const continentBounds = [
  // North America
  { minLat: 25, maxLat: 70, minLng: -170, maxLng: -50 },
  // South America
  { minLat: -55, maxLat: 15, minLng: -82, maxLng: -35 },
  // Europe
  { minLat: 35, maxLat: 72, minLng: -10, maxLng: 40 },
  // Africa
  { minLat: -35, maxLat: 37, minLng: -18, maxLng: 52 },
  // Asia
  { minLat: 5, maxLat: 75, minLng: 40, maxLng: 145 },
  // Australia
  { minLat: -45, maxLat: -10, minLng: 110, maxLng: 155 },
];

function isOnLand(lat: number, lng: number): boolean {
  return continentBounds.some(
    (b) => lat >= b.minLat && lat <= b.maxLat && lng >= b.minLng && lng <= b.maxLng
  );
}

interface Location {
  city: string;
  lat: number;
  lng: number;
  label: string;
}

interface DotMatrixMapProps {
  locations: Location[];
  className?: string;
  showPath?: boolean;
  animate?: boolean;
}

export default function DotMatrixMap({
  locations,
  className = "",
  showPath = true,
  animate = true,
}: DotMatrixMapProps) {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  const dots = useMemo(() => {
    const result: { x: number; y: number; delay: number }[] = [];
    for (let lat = 80; lat > -60; lat -= 4) {
      for (let lng = -180; lng < 180; lng += 5) {
        if (isOnLand(lat, lng)) {
          const { x, y } = latLngToXY(lat, lng);
          result.push({ x, y, delay: x / MAP_WIDTH });
        }
      }
    }
    return result;
  }, []);

  const pins = locations.map((loc) => ({
    ...loc,
    ...latLngToXY(loc.lat, loc.lng),
  }));

  // Path between cities
  const pathD = pins.length > 1
    ? pins.reduce((d, pin, i) => {
        if (i === 0) return `M ${pin.x} ${pin.y}`;
        const prev = pins[i - 1];
        const cpX = (prev.x + pin.x) / 2;
        const cpY = Math.min(prev.y, pin.y) - 30;
        return `${d} Q ${cpX} ${cpY} ${pin.x} ${pin.y}`;
      }, "")
    : "";

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Dots */}
      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={DOT_SIZE / 2}
          fill="#444"
          initial={animate ? { opacity: 0 } : { opacity: 0.6 }}
          animate={{ opacity: 0.6 }}
          transition={animate ? { delay: dot.delay * 1.5, duration: 0.3 } : undefined}
        />
      ))}

      {/* Connection path */}
      {showPath && pathD && (
        <motion.path
          d={pathD}
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
      )}

      {/* Location pins */}
      {pins.map((pin, i) => (
        <g
          key={pin.city}
          onMouseEnter={() => setHoveredPin(i)}
          onMouseLeave={() => setHoveredPin(null)}
          style={{ cursor: "pointer" }}
        >
          {/* Pin dot */}
          <motion.circle
            cx={pin.x}
            cy={pin.y}
            r={4}
            fill={i === pins.length - 1 ? "#22c55e" : "#eab308"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.3, type: "spring", stiffness: 300 }}
          />

          {/* Pulse ring */}
          <motion.circle
            cx={pin.x}
            cy={pin.y}
            r={4}
            fill="none"
            stroke={i === pins.length - 1 ? "#22c55e" : "#eab308"}
            strokeWidth="1"
            animate={{
              r: [4, 12],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />

          {/* Label */}
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: hoveredPin === i ? 1 : 0.7,
              y: hoveredPin === i ? -2 : 0,
              scale: hoveredPin === i ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <text
              x={pin.x + 8}
              y={pin.y + 4}
              fill="#aaa"
              fontSize="7"
              fontFamily="monospace"
            >
              {pin.label}
            </text>
          </motion.g>
        </g>
      ))}
    </svg>
  );
}
```

- [ ] **Step 2: Create ExperienceMapCard**

Create `src/components/dashboard/ExperienceMapCard.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import DotMatrixMap from "@/components/shared/DotMatrixMap";
import { profile } from "@/data/profile";

export default function ExperienceMapCard() {
  return (
    <motion.div
      className="relative flex flex-col overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-6"
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 text-xs text-dark-muted">
        <Globe size={14} />
        MY EXPERIENCE
      </div>

      {/* Map */}
      <div className="flex-1">
        <DotMatrixMap locations={profile.experience} />
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Wire ExperienceMapCard into dashboard**

In `src/app/page.tsx`, replace the map placeholder:

```tsx
// Add import at top
import ExperienceMapCard from "@/components/dashboard/ExperienceMapCard";

// Replace the map placeholder div with:
<motion.div variants={fadeInUp} style={{ gridArea: "map" }}>
  <ExperienceMapCard />
</motion.div>
```

- [ ] **Step 4: Verify map renders with animated path**

Open http://localhost:3000. Expect: Dot-matrix world map with continent shapes. Green path draws between city pins. Pins pulse. Hovering a pin enlarges its label.

- [ ] **Step 5: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/shared/DotMatrixMap.tsx src/components/dashboard/ExperienceMapCard.tsx src/app/page.tsx
git commit -m "feat: add Experience Map card with dot-matrix world map and animated path"
```

---

## Phase 4: Terminal

### Task 10: Terminal Engine (Command Registry + Parser)

**Files:**
- Create: `src/components/terminal/TerminalEngine.ts`
- Create: `src/commands/registry.ts`

- [ ] **Step 1: Create command registry**

Create `src/commands/registry.ts`:

```ts
export interface CommandResult {
  output: string;
  isError?: boolean;
  isHtml?: boolean;
}

export type CommandHandler = (args: string[]) => CommandResult;

export interface Command {
  name: string;
  description: string;
  handler: CommandHandler;
}

const commands = new Map<string, Command>();

export function registerCommand(
  name: string,
  description: string,
  handler: CommandHandler
): void {
  commands.set(name.toLowerCase(), { name, description, handler });
}

export function getCommand(name: string): Command | undefined {
  return commands.get(name.toLowerCase().replace(/^\//, ""));
}

export function getAllCommands(): Command[] {
  return Array.from(commands.values());
}

export function getCommandNames(): string[] {
  return Array.from(commands.keys());
}
```

- [ ] **Step 2: Create TerminalEngine**

Create `src/components/terminal/TerminalEngine.ts`:

```ts
import { getCommand, getCommandNames, type CommandResult } from "@/commands/registry";

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "welcome" | "error";
  content: string;
  isHtml?: boolean;
}

export class TerminalEngine {
  private history: string[] = [];
  private historyIndex: number = -1;
  private lines: TerminalLine[] = [];
  private idCounter: number = 0;
  private onUpdate: (lines: TerminalLine[]) => void;

  constructor(onUpdate: (lines: TerminalLine[]) => void) {
    this.onUpdate = onUpdate;
    this.addWelcome();
  }

  private nextId(): string {
    return `line-${this.idCounter++}`;
  }

  private addWelcome(): void {
    const asciiArt = [
      "╔╦╗╔═╗╔╦╗╔═╗  ╦═╗╔═╗╦ ╦╔╗╔╔═╗╦  ╔╦╗╔═╗",
      " ║ ╠═╣ ║ ║╣   ╠╦╝║╣ ╚╦╝║║║║ ║║   ║║╚═╗",
      " ╩ ╩ ╩ ╩ ╚═╝  ╩╚═╚═╝ ╩ ╝╚╝╚═╝╩═╝═╩╝╚═╝",
    ].join("\n");

    this.lines.push(
      { id: this.nextId(), type: "welcome", content: asciiArt },
      { id: this.nextId(), type: "output", content: "" },
      { id: this.nextId(), type: "output", content: "Welcome, visitor." },
      { id: this.nextId(), type: "output", content: "Type /help for available commands." },
      { id: this.nextId(), type: "output", content: "" }
    );
    this.onUpdate([...this.lines]);
  }

  execute(input: string): void {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add input line
    this.lines.push({
      id: this.nextId(),
      type: "input",
      content: trimmed,
    });

    // Add to history
    this.history.unshift(trimmed);
    this.historyIndex = -1;

    // Parse command
    const parts = trimmed.replace(/^\//, "").split(/\s+/);
    const commandName = parts[0];
    const args = parts.slice(1);

    const command = getCommand(commandName);
    if (command) {
      const result: CommandResult = command.handler(args);
      this.lines.push({
        id: this.nextId(),
        type: result.isError ? "error" : "output",
        content: result.output,
        isHtml: result.isHtml,
      });
    } else {
      this.lines.push({
        id: this.nextId(),
        type: "error",
        content: `Command not found: ${commandName}. Type /help for available commands.`,
      });
    }

    this.lines.push({ id: this.nextId(), type: "output", content: "" });
    this.onUpdate([...this.lines]);
  }

  getHistoryUp(): string | null {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      return this.history[this.historyIndex];
    }
    return null;
  }

  getHistoryDown(): string | null {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      return this.history[this.historyIndex];
    }
    if (this.historyIndex === 0) {
      this.historyIndex = -1;
      return "";
    }
    return null;
  }

  getTabCompletion(partial: string): string | null {
    const clean = partial.replace(/^\//, "").toLowerCase();
    if (!clean) return null;

    const matches = getCommandNames().filter((name) => name.startsWith(clean));
    if (matches.length === 1) return `/${matches[0]}`;
    return null;
  }

  clear(): void {
    this.lines = [];
    this.onUpdate([]);
  }

  getLines(): TerminalLine[] {
    return [...this.lines];
  }
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/commands/registry.ts src/components/terminal/TerminalEngine.ts
git commit -m "feat: add terminal engine with command registry, history, and tab completion"
```

---

### Task 11: Terminal Commands

**Files:**
- Create: `src/commands/about.ts`
- Create: `src/commands/work.ts`
- Create: `src/commands/skills.ts`
- Create: `src/commands/help.ts`
- Create: `src/commands/contact.ts`
- Create: `src/commands/clear.ts`
- Create: `src/commands/index.ts`

- [ ] **Step 1: Create all command files**

Create `src/commands/about.ts`:

```ts
import { registerCommand } from "./registry";

registerCommand("about", "Learn about Tate Reynolds", () => ({
  output: [
    "┌─────────────────────────────────────────────┐",
    "│  Tate Reynolds                               │",
    "│  Software Engineer                           │",
    "│                                              │",
    "│  From art spaces to digital systems, I       │",
    "│  build thoughtful experiences at the          │",
    "│  intersection of design and engineering.      │",
    "│                                              │",
    "│  Currently based in San Francisco.            │",
    "│  Previously: Boston, New York, Shanghai.      │",
    "└─────────────────────────────────────────────┘",
  ].join("\n"),
}));
```

Create `src/commands/work.ts`:

```ts
import { registerCommand } from "./registry";
import { projects } from "@/data/projects";

registerCommand("work", "View featured projects", () => {
  const lines = [
    "  PROJECT                    TYPE         STATUS",
    "  ─────────────────────────────────────────────",
  ];

  projects.slice(0, 8).forEach((p) => {
    const name = p.name.padEnd(28);
    const cat = p.category.padEnd(12);
    const status = p.status;
    lines.push(`  ${name} ${cat} ${status}`);
  });

  lines.push("");
  lines.push("  Visit /projects for the full gallery.");

  return { output: lines.join("\n") };
});
```

Create `src/commands/skills.ts`:

```ts
import { registerCommand } from "./registry";
import { profile } from "@/data/profile";

registerCommand("skills", "View skill breakdown", () => {
  const maxBar = 20;
  const maxScore = Math.max(...profile.skills.map((s) => s.score));

  const lines = [
    "  SKILL                      SCORE",
    "  ──────────────────────────────────",
  ];

  profile.skills.forEach((skill) => {
    const name = skill.name.padEnd(25);
    const barLen = Math.round((skill.score / maxScore) * maxBar);
    const bar = "█".repeat(barLen) + "░".repeat(maxBar - barLen);
    lines.push(`  ${name} ${bar} ${skill.score}`);
  });

  lines.push("");
  lines.push(`  TOOLS: ${profile.tools.join(", ")}`);

  return { output: lines.join("\n") };
});
```

Create `src/commands/help.ts`:

```ts
import { registerCommand, getAllCommands } from "./registry";

registerCommand("help", "Show available commands", () => {
  const commands = getAllCommands();
  const lines = [
    "  Available commands:",
    "  ──────────────────",
  ];

  commands.forEach((cmd) => {
    lines.push(`  /${cmd.name.padEnd(12)} ${cmd.description}`);
  });

  lines.push("");
  lines.push("  Tip: Use ↑/↓ for history, Tab for autocomplete.");

  return { output: lines.join("\n") };
});
```

Create `src/commands/contact.ts`:

```ts
import { registerCommand } from "./registry";

registerCommand("contact", "Get contact information", () => ({
  output: [
    "  ┌─────────────────────────────────────┐",
    "  │  Let's connect                       │",
    "  │                                      │",
    "  │  Email:    hello@tatereynolds.com     │",
    "  │  GitHub:   github.com/tatereynolds    │",
    "  │  LinkedIn: linkedin.com/in/tate       │",
    "  │  Twitter:  @tatereynolds              │",
    "  └─────────────────────────────────────┘",
  ].join("\n"),
}));
```

Create `src/commands/clear.ts`:

```ts
import { registerCommand } from "./registry";

registerCommand("clear", "Clear the terminal", () => ({
  output: "__CLEAR__",
}));
```

- [ ] **Step 2: Create commands index to register all**

Create `src/commands/index.ts`:

```ts
// Import all command files to trigger their registerCommand() calls
import "./about";
import "./work";
import "./skills";
import "./help";
import "./contact";
import "./clear";
```

- [ ] **Step 3: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/commands/about.ts src/commands/work.ts src/commands/skills.ts src/commands/help.ts src/commands/contact.ts src/commands/clear.ts src/commands/index.ts
git commit -m "feat: add terminal commands (about, work, skills, help, contact, clear)"
```

---

### Task 12: Terminal UI Components

**Files:**
- Create: `src/components/terminal/TerminalInput.tsx`
- Create: `src/components/terminal/TerminalOutput.tsx`
- Create: `src/components/terminal/Terminal.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create TerminalOutput component**

Create `src/components/terminal/TerminalOutput.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TerminalLine } from "./TerminalEngine";

interface TerminalOutputProps {
  lines: TerminalLine[];
}

export default function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed">
      {lines.map((line) => (
        <div key={line.id}>
          {line.type === "input" && (
            <div className="text-dark-muted">
              <span className="text-accent-green">&gt; </span>
              {line.content}
            </div>
          )}
          {line.type === "output" && (
            <TypewriterLine content={line.content} />
          )}
          {line.type === "welcome" && (
            <pre className="text-accent-green whitespace-pre text-xs">
              {line.content}
            </pre>
          )}
          {line.type === "error" && (
            <div className="text-red-400">{line.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function TypewriterLine({ content }: { content: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!content) {
      setDisplayed("");
      setDone(true);
      return;
    }

    let i = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      if (i < content.length) {
        setDisplayed(content.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 8 + Math.random() * 15);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <div className="whitespace-pre text-dark-text">
      {done ? content : displayed}
    </div>
  );
}
```

- [ ] **Step 2: Create TerminalInput component**

Create `src/components/terminal/TerminalInput.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalInputProps {
  onSubmit: (command: string) => void;
  onHistoryUp: () => string | null;
  onHistoryDown: () => string | null;
  onTabComplete: (partial: string) => string | null;
}

export default function TerminalInput({
  onSubmit,
  onHistoryUp,
  onHistoryDown,
  onTabComplete,
}: TerminalInputProps) {
  const [value, setValue] = useState("");
  const [ghost, setGhost] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value);
      setValue("");
      setGhost("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = onHistoryUp();
      if (prev !== null) setValue(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = onHistoryDown();
      if (next !== null) setValue(next);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (ghost) {
        setValue(ghost);
        setGhost("");
      } else {
        const completion = onTabComplete(value);
        if (completion) {
          setValue(completion);
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    // Show ghost completion
    if (val.startsWith("/") && val.length > 1) {
      const completion = onTabComplete(val);
      if (completion && completion !== val) {
        setGhost(completion);
      } else {
        setGhost("");
      }
    } else {
      setGhost("");
    }
  };

  return (
    <div
      className="flex items-center border-t border-dark-border px-6 py-4 font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <span className="text-accent-green mr-2">&gt;</span>
      <div className="relative flex-1">
        {/* Ghost text */}
        {ghost && (
          <span className="pointer-events-none absolute left-0 text-dark-muted/40">
            {ghost}
          </span>
        )}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-white outline-none"
          placeholder='Type a command... try "/help"'
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      {/* Blinking cursor indicator */}
      <motion.div
        className="ml-1 h-4 w-2 bg-accent-green"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.53, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Create Terminal overlay component**

Create `src/components/terminal/Terminal.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";
import { TerminalEngine, TerminalLine } from "./TerminalEngine";
import "@/commands";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const engineRef = useRef<TerminalEngine | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !engineRef.current) {
      engineRef.current = new TerminalEngine(setLines);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = useCallback((input: string) => {
    if (!engineRef.current) return;

    if (input.trim().replace(/^\//, "") === "clear") {
      engineRef.current.clear();
      return;
    }

    engineRef.current.execute(input);
  }, []);

  const handleHistoryUp = useCallback(() => {
    return engineRef.current?.getHistoryUp() ?? null;
  }, []);

  const handleHistoryDown = useCallback(() => {
    return engineRef.current?.getHistoryDown() ?? null;
  }, []);

  const handleTabComplete = useCallback((partial: string) => {
    return engineRef.current?.getTabCompletion(partial) ?? null;
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-black/60"
            onClick={onClose}
          />

          {/* Terminal window */}
          <motion.div
            layoutId="hero-card"
            className="fixed inset-8 z-[101] flex flex-col overflow-hidden rounded-2xl border border-dark-border bg-[#1a1a2e]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-dark-border px-4 py-3">
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="h-3 w-3 rounded-full bg-red-500 transition-opacity hover:opacity-80"
                />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <span className="font-mono text-xs text-dark-muted">
                tate@portfolio ~ /terminal
              </span>
              <div className="w-12" />
            </div>

            {/* Output area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <TerminalOutput lines={lines} />
            </div>

            {/* Input area */}
            <TerminalInput
              onSubmit={handleSubmit}
              onHistoryUp={handleHistoryUp}
              onHistoryDown={handleHistoryDown}
              onTabComplete={handleTabComplete}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Wire Terminal into dashboard page**

In `src/app/page.tsx`, add the Terminal import and render it:

```tsx
// Add import at top
import Terminal from "@/components/terminal/Terminal";

// Add inside the component, after the grid closing tag:
<Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
```

- [ ] **Step 5: Verify terminal opens, accepts commands, shows typewriter output**

Open http://localhost:3000. Click the "Hello Stranger" card. Expect: Terminal overlay appears with blur backdrop, ASCII art welcome message, blinking cursor. Type `/help` — shows command list with typewriter effect. Type `/about` — shows bio. Press up arrow — recalls last command. Type `/sk` then Tab — completes to `/skills`. Press Escape to close.

- [ ] **Step 6: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/terminal/Terminal.tsx src/components/terminal/TerminalInput.tsx src/components/terminal/TerminalOutput.tsx src/app/page.tsx
git commit -m "feat: add interactive terminal overlay with commands, history, and tab completion"
```

---

## Phase 5: Project Gallery

### Task 13: Project Gallery Page with Filter Pills

**Files:**
- Create: `src/components/projects/FilterPills.tsx`
- Create: `src/components/projects/ViewToggle.tsx`
- Create: `src/app/projects/page.tsx`

- [ ] **Step 1: Create FilterPills component**

Create `src/components/projects/FilterPills.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { categoryCounts, categoryLabels } from "@/data/projects";
import type { ProjectCategory } from "@/data/types";

interface FilterPillsProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

export default function FilterPills({
  activeCategory,
  onCategoryChange,
}: FilterPillsProps) {
  const categories = Object.keys(categoryLabels) as ProjectCategory[];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`relative flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === cat
              ? "border-black bg-black text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeCategory === cat && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-black"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{categoryLabels[cat]}</span>
          <motion.span
            className={`relative z-10 rounded-full px-1.5 text-xs ${
              activeCategory === cat
                ? "bg-white/20 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            animate={{
              scale: activeCategory === cat ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {categoryCounts[cat]}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create ViewToggle component**

Create `src/components/projects/ViewToggle.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import type { ViewMode } from "@/data/types";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>VIEW BY</span>
      <div className="flex gap-1">
        <motion.button
          onClick={() => onViewChange("grid")}
          className={`rounded-md p-1.5 ${
            viewMode === "grid" ? "bg-black text-white" : "text-gray-400 hover:text-gray-700"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <LayoutGrid size={18} />
        </motion.button>
        <motion.button
          onClick={() => onViewChange("list")}
          className={`rounded-md p-1.5 ${
            viewMode === "list" ? "bg-black text-white" : "text-gray-400 hover:text-gray-700"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <List size={18} />
        </motion.button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create project gallery page**

Create `src/app/projects/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FilterPills from "@/components/projects/FilterPills";
import ViewToggle from "@/components/projects/ViewToggle";
import PageTransition from "@/components/shared/PageTransition";
import { getProjectsByCategory } from "@/data/projects";
import type { ProjectCategory, ViewMode } from "@/data/types";

export default function ProjectsPage() {
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const filteredProjects = getProjectsByCategory(category);

  return (
    <PageTransition className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-[1400px] px-8 py-6">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-4 text-5xl font-bold">Project</h1>
            <FilterPills
              activeCategory={category}
              onCategoryChange={setCategory}
            />
          </div>
          <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
        </div>

        {/* Project grid/list — placeholder, will be built in next tasks */}
        <motion.div layout className="grid gap-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-3 gap-4">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 ${
                    project.featured ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <div className="p-6">
                    <p className="text-xs text-gray-500 uppercase">{project.category}</p>
                    <h3 className="mt-2 text-lg font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-8 py-4"
                >
                  <span className="w-48 font-medium">{project.name}</span>
                  <span className="w-32 text-sm text-gray-500">{project.category}</span>
                  <span className="flex items-center gap-2 text-sm">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        project.status === "shipped"
                          ? "bg-green-500"
                          : project.status === "concept"
                          ? "bg-pink-400"
                          : "bg-yellow-400"
                      }`}
                    />
                    {project.status}
                  </span>
                  <span className="ml-auto text-sm text-gray-400">{project.updatedAt}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 4: Verify gallery page renders with filter and view toggle**

Open http://localhost:3000/projects. Expect: "Project" title, filter pills with counts (clicking filters the list with layout animation), grid/list toggle switches views with morph animation.

- [ ] **Step 5: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/projects/FilterPills.tsx src/components/projects/ViewToggle.tsx src/app/projects/page.tsx
git commit -m "feat: add project gallery page with filter pills and view toggle"
```

---

### Task 14: Project Grid & List Cards with Hover Animations

**Files:**
- Create: `src/components/projects/ProjectCard.tsx`
- Create: `src/components/projects/ProjectListRow.tsx`
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Create ProjectCard (grid view)**

Create `src/components/projects/ProjectCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/types";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        layout
        layoutId={`project-card-${project.slug}`}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-[#1a1a1a] ${
          featured ? "col-span-2 row-span-2" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 40px -12px rgba(0,0,0,0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4">
          <motion.span
            className="text-xs font-medium uppercase text-gray-400"
            initial={{ x: -20, opacity: 0 }}
            animate={{
              x: isHovered ? 0 : -20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {project.category}
          </motion.span>
          {project.company && (
            <span className="text-xs font-semibold text-gray-400">
              {project.company}
            </span>
          )}
        </div>

        {/* Thumbnail area */}
        <div className="relative mx-5 my-4 overflow-hidden rounded-xl bg-gray-800">
          <motion.div
            className="aspect-video w-full bg-gradient-to-br from-gray-700 to-gray-900"
            animate={{ scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Placeholder — actual images will render here */}
            <div className="flex h-full items-center justify-center text-4xl text-gray-600">
              {project.name[0]}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 pb-4">
          <h3 className="text-sm font-semibold text-white">{project.name}</h3>
          <motion.span
            className="rounded-full border border-gray-600 px-3 py-1 text-xs text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            Discover
          </motion.span>
        </div>

        {/* Traffic light dots for featured */}
        {featured && (
          <div className="absolute left-5 top-4 flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
        )}
      </motion.div>
    </Link>
  );
}
```

- [ ] **Step 2: Create ProjectListRow (list view)**

Create `src/components/projects/ProjectListRow.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Globe, Eye, Sparkles } from "lucide-react";
import type { Project } from "@/data/types";

const categoryIcons: Record<string, React.ReactNode> = {
  dashboard: <Monitor size={14} />,
  app: <Smartphone size={14} />,
  website: <Globe size={14} />,
  visual: <Eye size={14} />,
  fun: <Sparkles size={14} />,
};

const statusColors: Record<string, string> = {
  shipped: "bg-green-500",
  concept: "bg-pink-400",
  "live-demo": "bg-yellow-400",
};

const statusLabels: Record<string, string> = {
  shipped: "Shipped",
  concept: "Concept",
  "live-demo": "Live Demo",
};

interface ProjectListRowProps {
  project: Project;
  index: number;
}

export default function ProjectListRow({ project, index }: ProjectListRowProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        layout
        layoutId={`project-row-${project.slug}`}
        className="group flex cursor-pointer items-center gap-8 border-b border-gray-100 py-5 transition-colors hover:bg-gray-50"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03 }}
        whileHover={{ x: 4 }}
      >
        {/* Project name */}
        <span className="w-56 font-medium text-gray-900">{project.name}</span>

        {/* Thumbnail */}
        <div className="h-14 w-32 overflow-hidden rounded-lg bg-gray-100">
          <motion.div
            className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              Preview
            </div>
          </motion.div>
        </div>

        {/* Category */}
        <span className="flex w-32 items-center gap-2 text-sm text-gray-500">
          {categoryIcons[project.category]}
          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
        </span>

        {/* Status */}
        <span className="flex items-center gap-2 text-sm">
          <span className={`h-2.5 w-2.5 rounded-full ${statusColors[project.status]}`} />
          {statusLabels[project.status]}
        </span>

        {/* Date */}
        <span className="ml-auto text-sm text-gray-400">{project.updatedAt}</span>
      </motion.div>
    </Link>
  );
}
```

- [ ] **Step 3: Update projects page to use new components**

Replace the grid/list rendering section in `src/app/projects/page.tsx`:

```tsx
// Add imports at top
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectListRow from "@/components/projects/ProjectListRow";

// Replace the grid/list section (the motion.div with layout) with:
<motion.div layout>
  {viewMode === "grid" ? (
    <motion.div layout className="grid grid-cols-3 gap-4">
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          featured={project.featured}
        />
      ))}
    </motion.div>
  ) : (
    <div>
      {/* Table header */}
      <div className="flex items-center gap-8 border-b border-gray-200 pb-3 text-xs font-semibold uppercase text-gray-400">
        <span className="w-56">Project</span>
        <span className="w-32">Preview</span>
        <span className="w-32">Category</span>
        <span>Status</span>
        <span className="ml-auto">Updated Time</span>
      </div>
      {filteredProjects.map((project, i) => (
        <ProjectListRow key={project.slug} project={project} index={i} />
      ))}
    </div>
  )}
</motion.div>
```

- [ ] **Step 4: Verify grid and list views with hover animations**

Open http://localhost:3000/projects. Expect: Grid view shows dark cards with lift on hover, "Discover" button slides up, category label slides in. Switch to list view — rows shift right on hover with thumbnail scale. Clicking filters animates the layout change.

- [ ] **Step 5: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/projects/ProjectCard.tsx src/components/projects/ProjectListRow.tsx src/app/projects/page.tsx
git commit -m "feat: add ProjectCard and ProjectListRow with hover animations"
```

---

### Task 15: Expanded Project Detail Page

**Files:**
- Create: `src/components/projects/SnapshotTabs.tsx`
- Create: `src/components/projects/DesignFocusCard.tsx`
- Create: `src/components/shared/StickyFooter.tsx`
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create SnapshotTabs component**

Create `src/components/projects/SnapshotTabs.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SnapshotTabsProps {
  snapshot: { goal: string; challenge: string; outcome: string };
}

type TabKey = "goal" | "challenge" | "outcome";

export default function SnapshotTabs({ snapshot }: SnapshotTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("goal");
  const tabs: TabKey[] = ["goal", "challenge", "outcome"];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
        PROJECT SNAPSHOT
      </div>

      {/* Tab switcher */}
      <div className="mb-6 flex overflow-hidden rounded-full border border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative flex-1 px-4 py-2 text-sm font-medium capitalize"
          >
            {activeTab === tab && (
              <motion.span
                layoutId="snapshot-tab"
                className="absolute inset-0 rounded-full bg-black"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${
                activeTab === tab ? "text-white" : "text-gray-600"
              }`}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[120px]">
        <h3 className="mb-3 text-2xl font-bold capitalize">{activeTab}</h3>
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-sm leading-relaxed text-gray-600"
          >
            {snapshot[activeTab]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create DesignFocusCard component**

Create `src/components/projects/DesignFocusCard.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface DesignFocusItem {
  label: string;
  leftLabel: string;
  rightLabel: string;
  current: number;
  target: number;
}

interface DesignFocusCardProps {
  items: DesignFocusItem[];
}

export default function DesignFocusCard({ items }: DesignFocusCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <div className="h-3 w-3 rounded-full border-2 border-gray-400" />
          DESIGN FOCUS
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" /> Current
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Target
          </span>
        </div>
      </div>

      {/* Scale rows */}
      <div className="mt-4 space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="group"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center gap-3">
                <span className="w-28 text-right text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                  {item.leftLabel}
                </span>

                {/* Scale bar */}
                <div className="relative h-2 flex-1 rounded-full bg-gray-100">
                  {/* Current dot */}
                  <motion.div
                    className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-yellow-400 shadow-sm"
                    initial={{ left: "50%" }}
                    animate={{ left: `${item.current * 100}%` }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    whileHover={{ scale: 1.3 }}
                  />
                  {/* Target dot */}
                  <motion.div
                    className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-green-500 shadow-sm"
                    initial={{ left: "50%" }}
                    animate={{ left: `${item.target * 100}%` }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    whileHover={{ scale: 1.3 }}
                  />
                </div>

                <span className="w-28 text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                  {item.rightLabel}
                </span>
              </div>
            </div>
            <p className="mt-1 text-center text-[10px] text-gray-300">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create StickyFooter component**

Create `src/components/shared/StickyFooter.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Layers, BarChart3, User, List, ArrowUp } from "lucide-react";

interface StickyFooterProps {
  backHref: string;
  title: string;
}

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/projects", icon: Layers, label: "Project" },
  { href: "/case-study", icon: BarChart3, label: "Case Study" },
  { href: "/profile", icon: User, label: "My Profile" },
];

export default function StickyFooter({ backHref, title }: StickyFooterProps) {
  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-gray-200 bg-white/90 px-6 py-3 backdrop-blur-md"
    >
      {/* Left: Back + Title */}
      <div className="flex items-center gap-3">
        <Link href={backHref}>
          <motion.span
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-black"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft size={14} />
            Go Back
          </motion.span>
        </Link>
        <span className="text-sm font-medium">{title}</span>
      </div>

      {/* Center: Nav */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.span
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-black"
              whileHover={{ y: -2 }}
            >
              <item.icon size={14} />
              {item.label}
            </motion.span>
          </Link>
        ))}
      </div>

      {/* Right: Icons + Live */}
      <div className="flex items-center gap-3">
        <button className="text-gray-400 hover:text-black">
          <List size={16} />
        </button>
        <button
          className="text-gray-400 hover:text-black"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={16} />
        </button>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <motion.span
            className="h-2 w-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Live
        </span>
      </div>
    </motion.footer>
  );
}
```

- [ ] **Step 4: Create expanded project page**

Create `src/app/projects/[slug]/page.tsx`:

```tsx
"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Hash, User, Wrench, Settings } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import SnapshotTabs from "@/components/projects/SnapshotTabs";
import DesignFocusCard from "@/components/projects/DesignFocusCard";
import StickyFooter from "@/components/shared/StickyFooter";
import PageTransition from "@/components/shared/PageTransition";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const overviewIcons = {
  type: Hash,
  role: User,
  tool: Wrench,
  contribution: Settings,
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

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

        {/* Top 3-column grid */}
        <motion.div
          className="mb-8 grid grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Info */}
          <motion.div variants={fadeInUp} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <p className="mb-6 text-sm leading-relaxed text-gray-700">
              {project.description}
            </p>

            <h3 className="mb-4 text-lg font-bold">Overview</h3>
            <div className="space-y-3">
              {(Object.keys(project.overview) as Array<keyof typeof project.overview>).map(
                (key) => {
                  const Icon = overviewIcons[key];
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between border-b border-gray-100 pb-2"
                    >
                      <span className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-500">
                        <Icon size={12} />
                        {key}
                      </span>
                      <span className="text-sm text-gray-700">
                        {project.overview[key]}
                      </span>
                    </div>
                  );
                }
              )}
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
                  {/* Screenshot placeholder */}
                  <div className="h-48 w-80 flex-shrink-0 overflow-hidden rounded-xl bg-gray-800">
                    <motion.div
                      className="flex h-full items-center justify-center text-gray-500"
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="text-center text-xs">
                        <div className="mb-2 flex gap-1.5 px-3">
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                          <div className="h-2 w-2 rounded-full bg-yellow-500" />
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                        Screenshot
                      </div>
                    </motion.div>
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
```

- [ ] **Step 5: Verify project detail page renders**

Open http://localhost:3000/projects/signal. Expect: Back arrow, "Signal" title, 3-column layout with info, snapshot tabs (click Goal/Challenge/Outcome), design focus sliders with animated dots, analogous experiences section, sticky footer.

- [ ] **Step 6: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/projects/SnapshotTabs.tsx src/components/projects/DesignFocusCard.tsx src/components/shared/StickyFooter.tsx src/app/projects/\\[slug\\]/page.tsx
git commit -m "feat: add expanded project detail page with snapshot tabs, design focus, and sticky footer"
```

---

## Phase 6: Case Study

### Task 16: 3D Book Shelf

**Files:**
- Create: `src/components/case-study/Book3D.tsx`
- Create: `src/components/case-study/BookShelf.tsx`
- Create: `src/app/case-study/page.tsx`

- [ ] **Step 1: Create Book3D component**

Create `src/components/case-study/Book3D.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/data/types";

interface Book3DProps {
  study: CaseStudy;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  hoveredIndex: number | null;
}

export default function Book3D({
  study,
  index,
  isHovered,
  onHover,
  hoveredIndex,
}: Book3DProps) {
  const bookWidth = 180;
  const bookHeight = 320;
  const bookDepth = 50;

  // Calculate offset when another book is hovered
  const getOffset = () => {
    if (hoveredIndex === null) return 0;
    if (hoveredIndex === index) return 0;
    return index < hoveredIndex ? -60 : 60;
  };

  return (
    <Link href={`/case-study/${study.slug}`}>
      <motion.div
        className="relative cursor-pointer"
        style={{
          width: bookWidth,
          height: bookHeight,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        animate={{
          x: getOffset(),
          scale: isHovered ? 1.15 : 1,
          rotateY: isHovered ? -5 : -30,
          z: isHovered ? 50 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Book container */}
        <div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front cover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-r-md"
            style={{
              backgroundColor: study.bookColor.cover,
              backfaceVisibility: "hidden",
              transform: `translateZ(${bookDepth / 2}px)`,
            }}
          >
            {/* Cover content — simplified art placeholder */}
            <div className="flex h-full w-full flex-col items-center justify-center p-4">
              <div className="text-center text-xs font-bold uppercase" style={{ color: study.bookColor.accent }}>
                {study.title}
              </div>
            </div>

            {/* Shine sweep on hover */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, transparent 50%)",
              }}
              animate={{
                x: isHovered ? ["-100%", "200%"] : "-100%",
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Spine */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: bookDepth,
              height: bookHeight,
              backgroundColor: study.bookColor.spine,
              transform: `rotateY(-90deg) translateZ(${bookWidth - bookDepth / 2}px) translateX(-${bookDepth / 2}px)`,
              transformOrigin: "left center",
            }}
          >
            <span
              className="whitespace-nowrap text-sm font-bold"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                color: study.bookColor.cover,
              }}
            >
              {study.title}
            </span>
          </div>

          {/* Pages (right side) */}
          <div
            className="absolute"
            style={{
              width: bookDepth,
              height: bookHeight - 8,
              top: 4,
              backgroundColor: study.bookColor.pages,
              transform: `rotateY(90deg) translateZ(${bookDepth / 2 - 2}px) translateX(-${bookDepth / 2}px)`,
              transformOrigin: "left center",
              backgroundImage:
                "repeating-linear-gradient(to right, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 3px)",
            }}
          />

          {/* Shadow */}
          <motion.div
            className="absolute -bottom-4 left-2 right-2 h-8 rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(0,0,0,0.2), transparent 70%)",
            }}
            animate={{
              opacity: isHovered ? 0.4 : 0.2,
              scaleX: isHovered ? 1.2 : 1,
            }}
          />
        </div>
      </motion.div>
    </Link>
  );
}
```

- [ ] **Step 2: Create BookShelf component**

Create `src/components/case-study/BookShelf.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Book3D from "./Book3D";
import { caseStudies } from "@/data/case-studies";

export default function BookShelf() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <motion.div
        className="flex items-end gap-2"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {caseStudies.map((study, i) => (
          <Book3D
            key={study.slug}
            study={study}
            index={i}
            isHovered={hoveredIndex === i}
            onHover={setHoveredIndex}
            hoveredIndex={hoveredIndex}
          />
        ))}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 3: Create case study page**

Create `src/app/case-study/page.tsx`:

```tsx
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
```

- [ ] **Step 4: Verify 3D books render with hover animations**

Open http://localhost:3000/case-study. Expect: 4 books standing with CSS 3D perspective showing spines. Hovering a book rotates it to show cover, scales up, pushes adjacent books aside. Shine sweep animates on cover. Click navigates to case study reader.

- [ ] **Step 5: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/case-study/Book3D.tsx src/components/case-study/BookShelf.tsx src/app/case-study/page.tsx
git commit -m "feat: add 3D book shelf with CSS transforms, hover rotation, and shine effect"
```

---

### Task 17: Case Study Reader

**Files:**
- Create: `src/components/case-study/TableOfContents.tsx`
- Create: `src/components/case-study/CaseStudyReader.tsx`
- Create: `src/app/case-study/[slug]/page.tsx`

- [ ] **Step 1: Create TableOfContents component**

Create `src/components/case-study/TableOfContents.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/data/types";

interface TableOfContentsProps {
  toc: CaseStudy["toc"];
  onNavigate: (id: string) => void;
}

export default function TableOfContents({ toc, onNavigate }: TableOfContentsProps) {
  return (
    <div className="space-y-6">
      {toc.map((section) => (
        <div key={section.section}>
          <div className="mb-3 border-t border-gray-300 pt-3">
            <span className="text-sm font-bold tracking-wider">
              {section.section} {section.title}
            </span>
          </div>

          <div className="space-y-2">
            {section.subsections.map((sub) => (
              <motion.button
                key={sub.id}
                onClick={() => onNavigate(sub.id)}
                className="group flex w-full items-center justify-between text-sm"
                whileHover={{ x: 4 }}
              >
                <span className="text-gray-700 group-hover:text-black">
                  {sub.title}
                </span>
                <div className="mx-2 flex-1 border-b border-dotted border-gray-300 opacity-0 transition-opacity group-hover:opacity-100" />
                <motion.span
                  className="text-gray-400"
                  whileHover={{ x: 4 }}
                >
                  {String(sub.page).padStart(2, "0")}
                </motion.span>
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create case study reader page**

Create `src/app/case-study/[slug]/page.tsx`:

```tsx
"use client";

import { use, useRef } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { getCaseStudyBySlug } from "@/data/case-studies";
import TableOfContents from "@/components/case-study/TableOfContents";
import StickyFooter from "@/components/shared/StickyFooter";
import PageTransition from "@/components/shared/PageTransition";

export default function CaseStudyReaderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const study = getCaseStudyBySlug(slug);
  if (!study) return notFound();

  const contentRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Flash effect
      el.classList.add("bg-yellow-50");
      setTimeout(() => el.classList.remove("bg-yellow-50"), 1000);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-white pb-20">
      {/* Page number header */}
      <div className="flex items-center justify-center gap-4 pt-4 text-xs text-gray-400">
        <span>00.0</span>
        <span className="font-semibold tracking-wider">CONTENTS</span>
      </div>

      {/* Split pane */}
      <div className="mx-auto flex max-w-[1400px] min-h-[calc(100vh-120px)]">
        {/* Left: Title page */}
        <motion.div
          className="flex w-1/2 flex-col justify-between border-r border-gray-200 p-12"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div>
            {study.subtitle && (
              <p className="mb-2 font-serif text-lg italic text-blue-600">
                {study.subtitle}
              </p>
            )}
            <h1 className="font-serif text-5xl font-bold leading-tight text-blue-900">
              {study.title}
            </h1>
          </div>

          {/* Decorative element at bottom */}
          <div className="text-6xl text-green-600 opacity-60">
            ❋
          </div>
        </motion.div>

        {/* Right: TOC + Content */}
        <motion.div
          ref={contentRef}
          className="w-1/2 overflow-y-auto p-12"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {/* Cover art placeholder */}
          <div className="mb-8 flex justify-center">
            <div
              className="h-48 w-48 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${study.bookColor.accent}, ${study.bookColor.spine})`,
              }}
            />
          </div>

          {/* Table of Contents */}
          <TableOfContents toc={study.toc} onNavigate={handleNavigate} />

          {/* Content sections */}
          <div className="mt-16 space-y-16">
            {study.content.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-8 transition-colors duration-1000"
              >
                <h2 className="mb-4 text-lg font-bold tracking-wide">
                  {section.heading}
                </h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <StickyFooter backHref="/case-study" title={study.title} />
    </PageTransition>
  );
}
```

- [ ] **Step 3: Verify case study reader renders**

Open http://localhost:3000/case-study/misuse-rate. Expect: Split layout — left shows title with decorative typography, right shows cover art placeholder, TOC with sections. Hovering TOC items shows dotted leader line. Clicking scrolls to section with yellow flash. Sticky footer at bottom.

- [ ] **Step 4: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/case-study/TableOfContents.tsx src/app/case-study/\\[slug\\]/page.tsx
git commit -m "feat: add case study reader with split pane layout, TOC navigation, and sticky footer"
```

---

## Phase 7: Profile Page

### Task 18: Identity Cards

**Files:**
- Create: `src/components/profile/IdentityCard.tsx`
- Create: `src/app/profile/page.tsx`

- [ ] **Step 1: Create IdentityCard with flip animation**

Create `src/components/profile/IdentityCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface IdentityCardProps {
  icon: string;
  description: string;
  tags: string[];
  label: string;
  backContent: string;
  index: number;
}

export default function IdentityCard({
  icon,
  description,
  tags,
  label,
  backContent,
  index,
}: IdentityCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamically get icon
  const IconComponent = (Icons as Record<string, React.ComponentType<{ size?: number }>>)[icon] || Icons.Star;

  return (
    <motion.div
      className="relative h-64 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6"
          style={{ backfaceVisibility: "hidden" }}
          animate={{
            y: isHovered && !isFlipped ? -4 : 0,
            boxShadow: isHovered && !isFlipped
              ? "0 10px 30px -10px rgba(0,0,0,0.1)"
              : "0 2px 8px -2px rgba(0,0,0,0.05)",
          }}
        >
          <motion.div
            animate={{ rotate: isHovered ? 15 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <IconComponent size={24} />
          </motion.div>

          <p className="text-sm leading-relaxed text-gray-600">{description}</p>

          <div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-600"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    backgroundColor: isHovered ? "#f3f4f6" : "#ffffff",
                  }}
                  transition={{ delay: i * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <h3 className="text-xl font-bold">{label}</h3>
          </div>
        </motion.div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-gray-100 bg-gray-900 p-6 text-white"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-sm leading-relaxed text-gray-300">{backContent}</p>
          <p className="mt-4 text-xs text-gray-500">Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create profile page with identity cards**

Create `src/app/profile/page.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/shared/PageTransition";
import IdentityCard from "@/components/profile/IdentityCard";
import { profile } from "@/data/profile";
import { staggerContainer } from "@/lib/animations";

export default function ProfilePage() {
  return (
    <PageTransition className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-[1400px] px-8 py-6">
        <h1 className="mb-8 text-5xl font-bold">My Profile</h1>

        {/* Identity cards */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {profile.identityCards.map((card, i) => (
            <IdentityCard
              key={card.label}
              {...card}
              index={i}
            />
          ))}
        </div>

        {/* Bottom row — placeholders for radar chart, map, testimonials */}
        <div className="grid grid-cols-3 gap-4" style={{ gridTemplateColumns: "1fr 2fr 1fr" }}>
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
```

- [ ] **Step 3: Verify identity cards render with flip animation**

Open http://localhost:3000/profile. Expect: 4 identity cards with icons, descriptions, tags. Cards stagger in. Hover lifts card, rotates icon, scales tags. Click flips card to reveal back content. Click again flips back.

- [ ] **Step 4: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/profile/IdentityCard.tsx src/app/profile/page.tsx
git commit -m "feat: add profile page with flippable identity cards"
```

---

### Task 19: Radar Chart & Testimonials

**Files:**
- Create: `src/components/profile/RadarChart.tsx`
- Create: `src/components/profile/TestimonialCard.tsx`
- Modify: `src/app/profile/page.tsx`

- [ ] **Step 1: Create RadarChart component**

Create `src/components/profile/RadarChart.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RadarChartProps {
  data: { axis: string; value: number }[];
  goals: string[];
}

export default function RadarChart({ data, goals }: RadarChartProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const cx = 150;
  const cy = 140;
  const maxR = 100;
  const levels = 5;
  const n = data.length;
  const angleSlice = (Math.PI * 2) / n;

  // Generate polygon points for a given level
  const getPolygonPoints = (scale: number) =>
    data
      .map((_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return `${cx + maxR * scale * Math.cos(angle)},${cy + maxR * scale * Math.sin(angle)}`;
      })
      .join(" ");

  // Data polygon
  const dataPoints = data
    .map((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const r = (d.value / 100) * maxR;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");

  return (
    <motion.div
      className="rounded-2xl border border-gray-100 bg-gray-900 p-6 text-white"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Front: Chart */}
        <div style={{ backfaceVisibility: "hidden" }}>
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
            <span>✧</span> USER PERSONA
          </div>

          <svg ref={ref} viewBox="0 0 300 280" className="w-full">
            {/* Grid levels */}
            {Array.from({ length: levels }, (_, i) => (
              <polygon
                key={i}
                points={getPolygonPoints((i + 1) / levels)}
                fill="none"
                stroke="#333"
                strokeWidth="0.5"
              />
            ))}

            {/* Axis lines */}
            {data.map((_, i) => {
              const angle = angleSlice * i - Math.PI / 2;
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={cx + maxR * Math.cos(angle)}
                  y2={cy + maxR * Math.sin(angle)}
                  stroke="#333"
                  strokeWidth="0.5"
                />
              );
            })}

            {/* Data polygon */}
            <motion.polygon
              points={isInView ? dataPoints : getPolygonPoints(0)}
              fill="rgba(34, 197, 94, 0.15)"
              stroke="#22c55e"
              strokeWidth="1.5"
              initial={false}
              animate={{ points: isInView ? dataPoints : getPolygonPoints(0) }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />

            {/* Axis labels */}
            {data.map((d, i) => {
              const angle = angleSlice * i - Math.PI / 2;
              const labelR = maxR + 25;
              const x = cx + labelR * Math.cos(angle);
              const y = cy + labelR * Math.sin(angle);

              return (
                <g
                  key={d.axis}
                  onMouseEnter={() => setHoveredAxis(i)}
                  onMouseLeave={() => setHoveredAxis(null)}
                  style={{ cursor: "pointer" }}
                >
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={hoveredAxis === i ? "#fff" : "#888"}
                    fontSize="10"
                    fontWeight={hoveredAxis === i ? "bold" : "normal"}
                  >
                    {d.axis}
                  </text>
                  {hoveredAxis === i && (
                    <text
                      x={x}
                      y={y + 14}
                      textAnchor="middle"
                      fill="#22c55e"
                      fontSize="9"
                    >
                      {d.value}%
                    </text>
                  )}
                </g>
              );
            })}

            {/* Scale labels */}
            {[20, 40, 60, 80, 100].map((val, i) => (
              <text
                key={val}
                x={cx - 8}
                y={cy - ((i + 1) / 5) * maxR + 3}
                fill="#555"
                fontSize="7"
                textAnchor="end"
              >
                {val}
              </text>
            ))}
          </svg>

          {/* Goals */}
          <div className="mt-2 border-t border-gray-700 pt-3">
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
              <span>○</span> GOAL
            </div>
            {goals.map((goal) => (
              <p key={goal} className="text-xs text-gray-400">{goal}</p>
            ))}
          </div>

          <motion.button
            onClick={() => setIsFlipped(true)}
            className="mt-3 w-full rounded-lg bg-white py-2 text-sm font-medium text-black"
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            Flip me
          </motion.button>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl bg-gray-900 p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="mb-4 text-lg font-bold">More About Me</h3>
          <p className="text-sm text-gray-400">
            Beyond the data points, I'm someone who believes technology should amplify human potential.
            I find inspiration in unexpected places — architecture, music, nature — and bring those perspectives
            to every project.
          </p>
          <motion.button
            onClick={() => setIsFlipped(false)}
            className="mt-6 w-full rounded-lg bg-white py-2 text-sm font-medium text-black"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Flip back
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create TestimonialCard component**

Create `src/components/profile/TestimonialCard.tsx`:

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Profile } from "@/data/types";

interface TestimonialCardProps {
  testimonials: Profile["testimonials"];
}

export default function TestimonialCard({ testimonials }: TestimonialCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, testimonials.length]);

  return (
    <div
      className="flex flex-col gap-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 cursor-pointer"
          animate={{
            scale: activeIndex === i ? 1 : 0.97,
            opacity: activeIndex === i ? 1 : 0.6,
            y: activeIndex === i ? -4 : 0,
            boxShadow: activeIndex === i
              ? "0 10px 30px -10px rgba(0,0,0,0.1)"
              : "0 2px 4px -2px rgba(0,0,0,0.05)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={() => setActiveIndex(i)}
          whileHover={{
            scale: 1.02,
            opacity: 1,
          }}
        >
          {/* Company logo placeholder */}
          <motion.div
            className="h-12 w-12 flex-shrink-0 rounded-xl bg-gray-100"
            animate={{
              filter: activeIndex === i ? "grayscale(0)" : "grayscale(1)",
            }}
          >
            <div className="flex h-full items-center justify-center text-xs font-bold text-gray-400">
              {t.company[0]}
            </div>
          </motion.div>

          <div>
            <p className="text-sm font-semibold">{t.name}</p>
            <p className="text-xs text-gray-400">{t.title}</p>
            <motion.p
              className="mt-2 text-sm text-gray-600"
              animate={{
                maxHeight: activeIndex === i ? "200px" : "60px",
              }}
              style={{ overflow: "hidden" }}
            >
              <motion.span
                animate={{ scale: activeIndex === i ? 1.2 : 1 }}
                className="inline text-lg text-gray-300"
              >
                "
              </motion.span>
              {t.quote}
              <motion.span
                animate={{ scale: activeIndex === i ? 1.2 : 1 }}
                className="inline text-lg text-gray-300"
              >
                "
              </motion.span>
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Update profile page to include radar chart, map, and testimonials**

Replace the bottom row placeholders in `src/app/profile/page.tsx`:

```tsx
// Add imports at top
import RadarChart from "@/components/profile/RadarChart";
import DotMatrixMap from "@/components/shared/DotMatrixMap";
import TestimonialCard from "@/components/profile/TestimonialCard";
import { Globe } from "lucide-react";

// Replace the bottom row div with:
<div className="grid gap-4" style={{ gridTemplateColumns: "1fr 2fr 1fr" }}>
  {/* Radar Chart */}
  <RadarChart data={profile.persona} goals={profile.goals} />

  {/* Experience Map */}
  <div className="rounded-2xl border border-gray-100 bg-gray-900 p-6 text-white">
    <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
      <Globe size={14} />
      MY EXPERIENCE
    </div>
    <DotMatrixMap locations={profile.experience} />
  </div>

  {/* Testimonials */}
  <TestimonialCard testimonials={profile.testimonials} />
</div>
```

- [ ] **Step 4: Verify radar chart, map, and testimonials render**

Open http://localhost:3000/profile. Expect: Radar chart draws outward on scroll, hovering axis shows value. "Flip me" button flips card. Experience map same as dashboard. Testimonials auto-cycle, pause on hover, active card lifts.

- [ ] **Step 5: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/profile/RadarChart.tsx src/components/profile/TestimonialCard.tsx src/app/profile/page.tsx
git commit -m "feat: add radar chart, experience map, and auto-cycling testimonials to profile page"
```

---

## Phase 8: Final Polish

### Task 20: Dark/Light Theme Handling for Nav

**Files:**
- Modify: `src/components/nav/Navbar.tsx`
- Modify: `src/components/nav/NavPill.tsx`

- [ ] **Step 1: Update NavPill to support dark mode**

In `src/components/nav/NavPill.tsx`, update the styling to accept a `dark` prop:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavPillProps {
  href: string;
  label: string;
  isActive: boolean;
  isDark?: boolean;
}

export default function NavPill({ href, label, isActive, isDark }: NavPillProps) {
  return (
    <Link href={href} className="relative px-5 py-2 text-sm font-medium">
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className={`absolute inset-0 rounded-full ${isDark ? "bg-white" : "bg-black"}`}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <motion.span
        className={`relative z-10 transition-colors duration-200 ${
          isActive
            ? isDark
              ? "text-black"
              : "text-white"
            : isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-600 hover:text-black"
        }`}
        whileHover={{ scale: 1.05 }}
      >
        {label}
      </motion.span>
    </Link>
  );
}
```

- [ ] **Step 2: Pass isDark to NavPills in Navbar**

In `src/components/nav/Navbar.tsx`, pass the `isDark` prop to each NavPill:

```tsx
{navItems.map((item) => (
  <NavPill
    key={item.href}
    href={item.href}
    label={item.label}
    isActive={getIsActive(item.href)}
    isDark={isDark}
  />
))}
```

- [ ] **Step 3: Verify nav theme switches between routes**

Navigate between / (dark) and /projects (light). Expect: Nav adapts — dark bg on dashboard has white active pill and light text; light bg on other pages has black active pill and dark text.

- [ ] **Step 4: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/components/nav/Navbar.tsx src/components/nav/NavPill.tsx
git commit -m "feat: add dark/light theme handling for navbar across routes"
```

---

### Task 21: Static Generation & Build Verification

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/case-study/[slug]/page.tsx`

- [ ] **Step 1: Add generateStaticParams to project detail page**

Add at the top level of `src/app/projects/[slug]/page.tsx`:

```tsx
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
```

- [ ] **Step 2: Add generateStaticParams to case study reader page**

Add at the top level of `src/app/case-study/[slug]/page.tsx`:

```tsx
import { caseStudies } from "@/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}
```

- [ ] **Step 3: Run production build**

```bash
cd /Users/e165072/code/personal/portfolio
npm run build
```

Expected: Build succeeds with all pages statically generated.

- [ ] **Step 4: Fix any build errors**

If build errors occur, fix them. Common issues: missing "use client" directives, import path errors, type mismatches.

- [ ] **Step 5: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add src/app/projects/\\[slug\\]/page.tsx src/app/case-study/\\[slug\\]/page.tsx
git commit -m "feat: add static generation for dynamic routes"
```

---

### Task 22: Create Placeholder Images Directory

**Files:**
- Create: `public/images/projects/.gitkeep`

- [ ] **Step 1: Create image directories**

```bash
cd /Users/e165072/code/personal/portfolio
mkdir -p public/images/projects
touch public/images/projects/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add public/images/projects/.gitkeep
git commit -m "chore: add placeholder images directory"
```

---

### Task 23: Final Integration Test

- [ ] **Step 1: Start dev server and verify all routes**

```bash
cd /Users/e165072/code/personal/portfolio
npm run dev
```

Test each route manually:

1. `/` — Dashboard: 5 bento cards, matrix rain, gauge, skill matrix, 3D room, map. Click hero card → terminal opens.
2. `/projects` — Gallery: Filter pills work, grid/list toggle morphs, cards have hover animations.
3. `/projects/signal` — Detail: 3-column layout, snapshot tabs switch, design focus dots animate, analogous section.
4. `/case-study` — Book shelf: 3D books rotate on hover, adjacent books shift.
5. `/case-study/misuse-rate` — Reader: Split pane, TOC navigation, scroll to section.
6. `/profile` — Identity cards flip, radar chart draws, testimonials cycle.
7. Nav: Pills animate between routes, theme adapts dark/light.
8. Terminal: Commands work (/help, /about, /work, /skills, /contact, /clear), history (up/down), tab completion.

- [ ] **Step 2: Run production build and verify**

```bash
cd /Users/e165072/code/personal/portfolio
npm run build && npm run start
```

Expected: All pages load correctly in production mode.

- [ ] **Step 3: Final commit**

```bash
cd /Users/e165072/code/personal/portfolio
git add -A
git commit -m "feat: complete portfolio website MVP with all pages and interactions"
```
