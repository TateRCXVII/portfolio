import type { Project } from "./types";

export const projects: Project[] = [
  // ── Dashboards ──────────────────────────────────────────────────────────────
  {
    slug: "signal",
    name: "Signal",
    category: "dashboard",
    company: "Bolster",
    status: "shipped",
    updatedAt: "2024-11",
    description:
      "AI-powered cybersecurity platform that detects, classifies, and remediates phishing and brand-impersonation threats in real time.",
    thumbnail: "/images/projects/signal/thumbnail.png",
    images: [
      "/images/projects/signal/01.png",
      "/images/projects/signal/02.png",
      "/images/projects/signal/03.png",
    ],
    featured: true,
    overview: {
      type: "Enterprise SaaS Dashboard",
      role: "Lead Product Designer",
      tool: "Figma, ProtoPie, FigJam",
      contribution:
        "End-to-end design — research, IA, interaction design, design system, and handoff.",
    },
    snapshot: {
      goal: "Give security analysts a single pane of glass to monitor, triage, and act on AI-detected phishing threats without switching between disparate tools.",
      challenge:
        "High information density combined with time-critical workflows meant that cognitive overload was a constant risk. We needed to surface the most urgent signals without burying analysts in noise.",
      outcome:
        "Shipped to enterprise customers, reducing mean time-to-triage by ~40 % and earning the product a G2 Leader badge in brand protection.",
    },
    designFocus: [
      {
        label: "Information Architecture",
        leftLabel: "Simple",
        rightLabel: "Complex",
        current: 4,
        target: 4,
      },
      {
        label: "Visual Density",
        leftLabel: "Sparse",
        rightLabel: "Dense",
        current: 3,
        target: 4,
      },
      {
        label: "Interaction Fidelity",
        leftLabel: "Low",
        rightLabel: "High",
        current: 5,
        target: 5,
      },
      {
        label: "Accessibility",
        leftLabel: "Basic",
        rightLabel: "WCAG AAA",
        current: 4,
        target: 5,
      },
      {
        label: "Design System Coverage",
        leftLabel: "Ad-hoc",
        rightLabel: "Systematic",
        current: 5,
        target: 5,
      },
    ],
    analogous: [
      {
        title: "Splunk SIEM",
        image: "/images/analogous/splunk.png",
        pros: "Powerful query language; highly configurable dashboards.",
        cons: "Steep learning curve; visual hierarchy is often overwhelming for new analysts.",
      },
      {
        title: "Datadog",
        image: "/images/analogous/datadog.png",
        pros: "Excellent real-time monitoring and alerting; clean widget system.",
        cons: "Security-specific workflows are bolted on rather than native.",
      },
      {
        title: "Palo Alto Cortex XDR",
        image: "/images/analogous/cortex.png",
        pros: "Deep threat-correlation engine; good incident timeline view.",
        cons: "UI is dense and requires extensive training; limited customization for non-SOC roles.",
      },
    ],
  },
  {
    slug: "bolster-ai",
    name: "Bolster AI",
    category: "dashboard",
    company: "Bolster",
    status: "concept",
    updatedAt: "2024-06",
    description:
      "Next-generation AI assistant layer for the Bolster platform, letting analysts query threat data in natural language and auto-generate takedown reports.",
    thumbnail: "/images/projects/bolster-ai/thumbnail.png",
    images: [
      "/images/projects/bolster-ai/01.png",
      "/images/projects/bolster-ai/02.png",
    ],
    overview: {
      type: "AI Feature Concept",
      role: "Product Designer",
      tool: "Figma, FigJam",
      contribution:
        "Concept exploration, conversation UX, and prompt-engineering patterns.",
    },
    snapshot: {
      goal: "Reduce analyst toil by letting them ask questions in plain English instead of building complex filter queries.",
      challenge:
        "Designing for LLM uncertainty — communicating confidence levels and handling ambiguous queries gracefully without eroding trust.",
      outcome:
        "Concept approved for roadmap inclusion; currently in engineering scoping phase.",
    },
    designFocus: [
      {
        label: "Conversational UX",
        leftLabel: "Form-based",
        rightLabel: "Chat-native",
        current: 5,
        target: 5,
      },
      {
        label: "Transparency",
        leftLabel: "Black-box",
        rightLabel: "Explainable",
        current: 4,
        target: 5,
      },
      {
        label: "Error Handling",
        leftLabel: "Silent",
        rightLabel: "Graceful",
        current: 3,
        target: 5,
      },
      {
        label: "Integration Depth",
        leftLabel: "Overlay",
        rightLabel: "Native",
        current: 3,
        target: 4,
      },
      {
        label: "Onboarding",
        leftLabel: "None",
        rightLabel: "Guided",
        current: 4,
        target: 4,
      },
    ],
  },
  {
    slug: "takedown-visibility-center",
    name: "Takedown Visibility Center",
    category: "dashboard",
    company: "Bolster",
    status: "shipped",
    updatedAt: "2023-09",
    description:
      "Real-time dashboard tracking the lifecycle of domain takedown requests — from submission through ISP response to final removal.",
    thumbnail: "/images/projects/takedown-visibility-center/thumbnail.png",
    images: [
      "/images/projects/takedown-visibility-center/01.png",
      "/images/projects/takedown-visibility-center/02.png",
    ],
    overview: {
      type: "Operational Dashboard",
      role: "Product Designer",
      tool: "Figma",
      contribution:
        "Research, UX design, visual design, and developer handoff.",
    },
    snapshot: {
      goal: "Give customers full visibility into every takedown request so they can answer support tickets without contacting Bolster.",
      challenge:
        "Status taxonomies across hundreds of ISPs and registrars vary wildly; normalizing them into a clear, customer-friendly status model required significant data modeling collaboration.",
      outcome:
        "Reduced customer-facing support tickets about takedown status by 60 % within one quarter of launch.",
    },
    designFocus: [
      {
        label: "Status Clarity",
        leftLabel: "Opaque",
        rightLabel: "Transparent",
        current: 5,
        target: 5,
      },
      {
        label: "Data Freshness",
        leftLabel: "Stale",
        rightLabel: "Real-time",
        current: 4,
        target: 5,
      },
      {
        label: "Filtering Power",
        leftLabel: "Basic",
        rightLabel: "Advanced",
        current: 4,
        target: 4,
      },
      {
        label: "Export Capability",
        leftLabel: "None",
        rightLabel: "Full",
        current: 3,
        target: 4,
      },
      {
        label: "Mobile Responsiveness",
        leftLabel: "Desktop-only",
        rightLabel: "Responsive",
        current: 2,
        target: 3,
      },
    ],
  },
  {
    slug: "checkphish-ai",
    name: "CheckPhish AI",
    category: "dashboard",
    company: "Bolster",
    status: "shipped",
    updatedAt: "2023-04",
    description:
      "Self-serve URL scanning portal powered by Bolster's AI engine, used by security researchers and SMBs to instantly assess phishing risk.",
    thumbnail: "/images/projects/checkphish-ai/thumbnail.png",
    images: [
      "/images/projects/checkphish-ai/01.png",
      "/images/projects/checkphish-ai/02.png",
    ],
    overview: {
      type: "Consumer Security Tool",
      role: "Product Designer",
      tool: "Figma, ProtoPie",
      contribution: "UX/UI redesign and onboarding flow.",
    },
    snapshot: {
      goal: "Lower the barrier to entry for non-enterprise users to leverage Bolster's scan engine for ad-hoc URL checks.",
      challenge:
        "Balancing simplicity for casual users with depth for power users without fragmenting the interface.",
      outcome:
        "30 % increase in weekly active users after redesign; API key sign-ups rose 25 %.",
    },
    designFocus: [
      {
        label: "Simplicity",
        leftLabel: "Complex",
        rightLabel: "Simple",
        current: 5,
        target: 5,
      },
      {
        label: "Result Clarity",
        leftLabel: "Technical",
        rightLabel: "Approachable",
        current: 4,
        target: 5,
      },
      {
        label: "Speed Perception",
        leftLabel: "Slow",
        rightLabel: "Instant",
        current: 4,
        target: 5,
      },
      {
        label: "Power-user Depth",
        leftLabel: "Surface",
        rightLabel: "Deep",
        current: 3,
        target: 4,
      },
      {
        label: "Trust Signaling",
        leftLabel: "Weak",
        rightLabel: "Strong",
        current: 4,
        target: 5,
      },
    ],
  },
  {
    slug: "abuse-mailbox",
    name: "Abuse Mailbox",
    category: "dashboard",
    company: "Bolster",
    status: "shipped",
    updatedAt: "2022-11",
    description:
      "Automated triage system for abuse@ inboxes that classifies, prioritizes, and routes inbound phishing reports using machine learning.",
    thumbnail: "/images/projects/abuse-mailbox/thumbnail.png",
    images: [
      "/images/projects/abuse-mailbox/01.png",
      "/images/projects/abuse-mailbox/02.png",
    ],
    overview: {
      type: "Internal Operations Tool",
      role: "Product Designer",
      tool: "Figma",
      contribution: "Full product design from discovery to delivery.",
    },
    snapshot: {
      goal: "Help enterprise abuse teams process thousands of inbound reports per day without manual triage.",
      challenge:
        "Designing for a workflow that mixes high automation with necessary human override, ensuring analysts trust the ML classifications.",
      outcome:
        "Customers using Abuse Mailbox reported 80 % reduction in manual triage time; became a key enterprise upsell.",
    },
    designFocus: [
      {
        label: "Automation Confidence",
        leftLabel: "Low trust",
        rightLabel: "High trust",
        current: 4,
        target: 5,
      },
      {
        label: "Bulk Actions",
        leftLabel: "One-by-one",
        rightLabel: "Bulk",
        current: 5,
        target: 5,
      },
      {
        label: "Integration Depth",
        leftLabel: "Standalone",
        rightLabel: "Integrated",
        current: 3,
        target: 4,
      },
      {
        label: "Audit Trail",
        leftLabel: "None",
        rightLabel: "Full",
        current: 4,
        target: 4,
      },
      {
        label: "Customization",
        leftLabel: "Fixed",
        rightLabel: "Configurable",
        current: 3,
        target: 4,
      },
    ],
  },

  // ── App ──────────────────────────────────────────────────────────────────────
  {
    slug: "listyle-ai",
    name: "LiStyle AI",
    category: "app",
    status: "concept",
    updatedAt: "2024-08",
    description:
      "AI personal-styling app that learns your wardrobe, lifestyle, and aesthetic preferences to generate daily outfit recommendations.",
    thumbnail: "/images/projects/listyle-ai/thumbnail.png",
    images: [
      "/images/projects/listyle-ai/01.png",
      "/images/projects/listyle-ai/02.png",
      "/images/projects/listyle-ai/03.png",
    ],
    overview: {
      type: "Consumer Mobile App",
      role: "Solo Designer",
      tool: "Figma, ProtoPie",
      contribution: "Concept, UX research, UI design, and prototype.",
    },
    snapshot: {
      goal: "Make professional styling advice accessible and personalized through an AI-first mobile experience.",
      challenge:
        "Onboarding users to teach the AI their style without feeling like a tedious survey; making recommendations feel personal, not algorithmic.",
      outcome:
        "Concept prototype tested with 12 participants — 10 said they would use it weekly. Pursuing development partnerships.",
    },
    designFocus: [
      {
        label: "Personalization Depth",
        leftLabel: "Generic",
        rightLabel: "Personal",
        current: 5,
        target: 5,
      },
      {
        label: "Onboarding Delight",
        leftLabel: "Tedious",
        rightLabel: "Delightful",
        current: 4,
        target: 5,
      },
      {
        label: "Visual Polish",
        leftLabel: "Functional",
        rightLabel: "Premium",
        current: 5,
        target: 5,
      },
      {
        label: "AI Explainability",
        leftLabel: "Black-box",
        rightLabel: "Transparent",
        current: 3,
        target: 4,
      },
      {
        label: "Wardrobe Management",
        leftLabel: "Basic",
        rightLabel: "Comprehensive",
        current: 4,
        target: 5,
      },
    ],
  },

  // ── Websites ─────────────────────────────────────────────────────────────────
  {
    slug: "bolster-ai-website",
    name: "Bolster AI Website",
    category: "website",
    company: "Bolster",
    status: "concept",
    updatedAt: "2024-03",
    description:
      "Full marketing-site redesign for Bolster, repositioning the brand as an AI-native cybersecurity leader.",
    thumbnail: "/images/projects/bolster-ai-website/thumbnail.png",
    images: [
      "/images/projects/bolster-ai-website/01.png",
      "/images/projects/bolster-ai-website/02.png",
    ],
    overview: {
      type: "Marketing Website",
      role: "Lead Designer",
      tool: "Figma, Framer",
      contribution: "Brand strategy, design, and Framer build.",
    },
    snapshot: {
      goal: "Align the public-facing brand with Bolster's pivot to AI-first positioning and differentiate from legacy DMARC vendors.",
      challenge:
        "Translating a highly technical product story into a narrative that resonates with both CISOs and practitioners.",
      outcome:
        "Concept approved by executive team; design direction adopted for the live site refresh.",
    },
    designFocus: [
      {
        label: "Brand Alignment",
        leftLabel: "Off-brand",
        rightLabel: "On-brand",
        current: 5,
        target: 5,
      },
      {
        label: "Messaging Clarity",
        leftLabel: "Jargon-heavy",
        rightLabel: "Clear",
        current: 4,
        target: 5,
      },
      {
        label: "Visual Storytelling",
        leftLabel: "Static",
        rightLabel: "Dynamic",
        current: 4,
        target: 5,
      },
      {
        label: "SEO Architecture",
        leftLabel: "Flat",
        rightLabel: "Structured",
        current: 3,
        target: 4,
      },
      {
        label: "Conversion Optimization",
        leftLabel: "Passive",
        rightLabel: "Active",
        current: 4,
        target: 5,
      },
    ],
  },
  {
    slug: "popmart",
    name: "POPMART",
    category: "website",
    status: "live-demo",
    updatedAt: "2023-12",
    description:
      "E-commerce concept redesign for POPMART's collectible toy brand — blending editorial design with seamless shopping UX.",
    thumbnail: "/images/projects/popmart/thumbnail.png",
    images: [
      "/images/projects/popmart/01.png",
      "/images/projects/popmart/02.png",
      "/images/projects/popmart/03.png",
    ],
    overview: {
      type: "E-commerce Website",
      role: "Solo Designer",
      tool: "Figma, Framer",
      contribution: "UX research, UI design, and interactive prototype.",
    },
    snapshot: {
      goal: "Redesign the POPMART shopping experience to match the brand's premium collectible positioning and reduce cart abandonment.",
      challenge:
        "The existing site treated blind-box collectibles like commodity products; the redesign needed to surface the joy and surprise of the category.",
      outcome:
        "Live Framer demo; concept shared on Dribbble with 2.4k views and 180+ likes.",
    },
    designFocus: [
      {
        label: "Brand Expression",
        leftLabel: "Generic",
        rightLabel: "Distinctive",
        current: 5,
        target: 5,
      },
      {
        label: "Product Storytelling",
        leftLabel: "Minimal",
        rightLabel: "Rich",
        current: 5,
        target: 5,
      },
      {
        label: "Checkout Friction",
        leftLabel: "High",
        rightLabel: "Frictionless",
        current: 4,
        target: 5,
      },
      {
        label: "Mobile Experience",
        leftLabel: "Afterthought",
        rightLabel: "Mobile-first",
        current: 4,
        target: 5,
      },
      {
        label: "Animation Quality",
        leftLabel: "None",
        rightLabel: "Cinematic",
        current: 4,
        target: 5,
      },
    ],
  },
  {
    slug: "viewing-rooms",
    name: "Viewing Rooms",
    category: "website",
    status: "shipped",
    updatedAt: "2022-06",
    description:
      "Virtual gallery platform allowing artists and galleries to host immersive online exhibitions with 3D room navigation.",
    thumbnail: "/images/projects/viewing-rooms/thumbnail.png",
    images: [
      "/images/projects/viewing-rooms/01.png",
      "/images/projects/viewing-rooms/02.png",
    ],
    overview: {
      type: "Virtual Gallery Platform",
      role: "Product Designer",
      tool: "Figma, Blender",
      contribution: "UX design, 3D environment concepts, and UI system.",
    },
    snapshot: {
      goal: "Give independent artists gallery-quality exhibition capabilities without physical space or installation costs.",
      challenge:
        "3D web navigation is inherently disorienting — balancing spatial immersion with usability required extensive prototype testing.",
      outcome:
        "Shipped and used by 40+ artists for virtual openings; average session duration 8.5 min (2× industry benchmark).",
    },
    designFocus: [
      {
        label: "Spatial Immersion",
        leftLabel: "Flat",
        rightLabel: "3D",
        current: 4,
        target: 5,
      },
      {
        label: "Artist Tools",
        leftLabel: "Limited",
        rightLabel: "Comprehensive",
        current: 3,
        target: 4,
      },
      {
        label: "Accessibility",
        leftLabel: "Exclusive",
        rightLabel: "Inclusive",
        current: 3,
        target: 4,
      },
      {
        label: "Load Performance",
        leftLabel: "Heavy",
        rightLabel: "Optimized",
        current: 3,
        target: 4,
      },
      {
        label: "Social Features",
        leftLabel: "None",
        rightLabel: "Rich",
        current: 2,
        target: 3,
      },
    ],
  },
  {
    slug: "brand-domain-protection",
    name: "Brand & Domain Protection",
    category: "website",
    company: "Bolster",
    status: "shipped",
    updatedAt: "2023-06",
    description:
      "Product marketing microsite for Bolster's Brand & Domain Protection suite, designed to drive enterprise lead generation.",
    thumbnail: "/images/projects/brand-domain-protection/thumbnail.png",
    images: [
      "/images/projects/brand-domain-protection/01.png",
      "/images/projects/brand-domain-protection/02.png",
    ],
    overview: {
      type: "Product Marketing Page",
      role: "Designer",
      tool: "Figma",
      contribution: "Design and content strategy.",
    },
    snapshot: {
      goal: "Create a dedicated landing page for the Brand & Domain Protection product line to support enterprise sales cycles.",
      challenge:
        "Communicating a complex, multi-layered product in a format that works for both executive buyers and technical evaluators.",
      outcome:
        "Page became the highest-converting product page on the Bolster site with a 4.2 % form completion rate.",
    },
    designFocus: [
      {
        label: "Value Proposition Clarity",
        leftLabel: "Vague",
        rightLabel: "Crystal clear",
        current: 5,
        target: 5,
      },
      {
        label: "Social Proof",
        leftLabel: "None",
        rightLabel: "Abundant",
        current: 4,
        target: 4,
      },
      {
        label: "CTA Placement",
        leftLabel: "Hidden",
        rightLabel: "Prominent",
        current: 5,
        target: 5,
      },
      {
        label: "Technical Depth",
        leftLabel: "Surface",
        rightLabel: "Deep",
        current: 3,
        target: 4,
      },
      {
        label: "Visual Hierarchy",
        leftLabel: "Flat",
        rightLabel: "Strong",
        current: 4,
        target: 5,
      },
    ],
  },

  // ── Visual ────────────────────────────────────────────────────────────────────
  {
    slug: "generative-data-art-i",
    name: "Generative Data Art I",
    category: "visual",
    status: "shipped",
    updatedAt: "2023-03",
    description:
      "A series of algorithmic artworks generated from public cybersecurity threat datasets — translating raw data into visual poetry.",
    thumbnail: "/images/projects/generative-data-art-i/thumbnail.png",
    images: [
      "/images/projects/generative-data-art-i/01.png",
      "/images/projects/generative-data-art-i/02.png",
      "/images/projects/generative-data-art-i/03.png",
    ],
    overview: {
      type: "Generative Art Series",
      role: "Artist / Developer",
      tool: "p5.js, JavaScript",
      contribution: "Concept, data wrangling, algorithm design, and rendering.",
    },
    snapshot: {
      goal: "Make abstract threat data emotionally resonant by expressing it through generative visual forms.",
      challenge:
        "Mapping numeric datasets to aesthetic outputs in a way that feels intentional rather than arbitrary required many iterations.",
      outcome:
        "Series of 12 prints exhibited at a local digital art showcase; two pieces sold as limited-edition giclée prints.",
    },
    designFocus: [
      {
        label: "Data Fidelity",
        leftLabel: "Decorative",
        rightLabel: "Data-driven",
        current: 4,
        target: 5,
      },
      {
        label: "Aesthetic Quality",
        leftLabel: "Utilitarian",
        rightLabel: "Fine art",
        current: 5,
        target: 5,
      },
      {
        label: "Algorithmic Complexity",
        leftLabel: "Simple",
        rightLabel: "Complex",
        current: 4,
        target: 4,
      },
      {
        label: "Color Theory",
        leftLabel: "Random",
        rightLabel: "Intentional",
        current: 5,
        target: 5,
      },
      {
        label: "Print Resolution",
        leftLabel: "Screen-only",
        rightLabel: "Print-ready",
        current: 4,
        target: 5,
      },
    ],
  },
  {
    slug: "generative-data-art-ii",
    name: "Generative Data Art II",
    category: "visual",
    status: "shipped",
    updatedAt: "2024-01",
    description:
      "Second series exploring network topology data from real phishing infrastructure — rendered as constellation maps and flow fields.",
    thumbnail: "/images/projects/generative-data-art-ii/thumbnail.png",
    images: [
      "/images/projects/generative-data-art-ii/01.png",
      "/images/projects/generative-data-art-ii/02.png",
    ],
    overview: {
      type: "Generative Art Series",
      role: "Artist / Developer",
      tool: "p5.js, D3.js, JavaScript",
      contribution: "Concept, data pipeline, algorithm design, and rendering.",
    },
    snapshot: {
      goal: "Evolve the first series by introducing graph-structure data and real-time rendering capabilities.",
      challenge:
        "Graph data is inherently messy; creating legible, beautiful compositions from noisy network topology required custom force-directed layouts.",
      outcome:
        "Featured in an online generative-art journal; open-source code repository received 340 GitHub stars.",
    },
    designFocus: [
      {
        label: "Data Fidelity",
        leftLabel: "Decorative",
        rightLabel: "Data-driven",
        current: 5,
        target: 5,
      },
      {
        label: "Aesthetic Quality",
        leftLabel: "Utilitarian",
        rightLabel: "Fine art",
        current: 5,
        target: 5,
      },
      {
        label: "Real-time Rendering",
        leftLabel: "Static",
        rightLabel: "Interactive",
        current: 4,
        target: 5,
      },
      {
        label: "Color Theory",
        leftLabel: "Random",
        rightLabel: "Intentional",
        current: 5,
        target: 5,
      },
      {
        label: "Code Quality",
        leftLabel: "Prototype",
        rightLabel: "Production",
        current: 4,
        target: 4,
      },
    ],
  },

  // ── Fun ───────────────────────────────────────────────────────────────────────
  {
    slug: "this-portfolio",
    name: "This Portfolio",
    category: "fun",
    status: "live-demo",
    updatedAt: "2025-03",
    description:
      "The very site you are browsing — a Next.js portfolio with custom animations, a book-style case-study reader, and generative backgrounds.",
    thumbnail: "/images/projects/this-portfolio/thumbnail.png",
    images: [
      "/images/projects/this-portfolio/01.png",
      "/images/projects/this-portfolio/02.png",
    ],
    overview: {
      type: "Personal Portfolio",
      role: "Designer & Developer",
      tool: "Next.js, TypeScript, Tailwind, Framer Motion",
      contribution: "Design, development, and content.",
    },
    snapshot: {
      goal: "Build a portfolio that itself demonstrates the quality and range of my design and engineering capabilities.",
      challenge:
        "Avoiding the trap of over-engineering at the expense of content clarity; the work must remain the hero, not the chrome.",
      outcome: "Live and in your hands right now.",
    },
    designFocus: [
      {
        label: "Self-expression",
        leftLabel: "Neutral",
        rightLabel: "Distinctive",
        current: 5,
        target: 5,
      },
      {
        label: "Performance",
        leftLabel: "Heavy",
        rightLabel: "Lightweight",
        current: 4,
        target: 5,
      },
      {
        label: "Animation Quality",
        leftLabel: "None",
        rightLabel: "Cinematic",
        current: 5,
        target: 5,
      },
      {
        label: "Content Clarity",
        leftLabel: "Busy",
        rightLabel: "Clear",
        current: 4,
        target: 5,
      },
      {
        label: "Code Quality",
        leftLabel: "Prototype",
        rightLabel: "Production",
        current: 4,
        target: 5,
      },
    ],
  },
  {
    slug: "terminal-adventure",
    name: "Terminal Adventure",
    category: "fun",
    status: "concept",
    updatedAt: "2024-10",
    description:
      "A text-based CLI adventure game set inside a cybersecurity operations center — where you play an analyst fighting a live breach.",
    thumbnail: "/images/projects/terminal-adventure/thumbnail.png",
    images: [
      "/images/projects/terminal-adventure/01.png",
      "/images/projects/terminal-adventure/02.png",
    ],
    overview: {
      type: "CLI Game / Interactive Fiction",
      role: "Designer & Developer",
      tool: "Node.js, Ink (React for CLI)",
      contribution: "Narrative design, game logic, and terminal UI.",
    },
    snapshot: {
      goal: "Build a playful, educational game that teaches basic security concepts through narrative rather than lectures.",
      challenge:
        "Designing compelling interactive fiction entirely within the constraints of a monospace terminal display.",
      outcome:
        "Playable prototype shared with security community; positive reception from educators looking for gamified training tools.",
    },
    designFocus: [
      {
        label: "Narrative Quality",
        leftLabel: "Thin",
        rightLabel: "Immersive",
        current: 4,
        target: 5,
      },
      {
        label: "Educational Value",
        leftLabel: "Entertainment",
        rightLabel: "Instructional",
        current: 4,
        target: 4,
      },
      {
        label: "Terminal Aesthetics",
        leftLabel: "Plain",
        rightLabel: "Stylized",
        current: 5,
        target: 5,
      },
      {
        label: "Replayability",
        leftLabel: "Linear",
        rightLabel: "Branching",
        current: 3,
        target: 5,
      },
      {
        label: "Accessibility",
        leftLabel: "Technical",
        rightLabel: "Approachable",
        current: 3,
        target: 4,
      },
    ],
  },
];

// ── Helper functions ────────────────────────────────────────────────────────────

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
  fun: "Fun",
};

export const categoryCounts: Record<string, number> = {
  all: projects.length,
  dashboard: projects.filter((p) => p.category === "dashboard").length,
  app: projects.filter((p) => p.category === "app").length,
  website: projects.filter((p) => p.category === "website").length,
  visual: projects.filter((p) => p.category === "visual").length,
  fun: projects.filter((p) => p.category === "fun").length,
};
