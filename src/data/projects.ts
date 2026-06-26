import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "mastercard-ai-enablement",
    name: "Open Finance AI Enablement",
    category: "ai-systems",
    company: "Mastercard",
    status: "shipped",
    updatedAt: "2026-04",
    summary:
      "Built repo-ready AI workflows, training, and guardrails that made coding agents useful on real fintech teams instead of staying in demo mode.",
    headline:
      "AI tooling program for engineering teams working in a regulated open finance environment.",
    featured: true,
    confidentiality: "redacted",
    overview: {
      role: "Software Engineer II, AI enablement lead",
      scope: "Developer productivity, repo integrations, training, quality controls",
      stack: "Codex, Claude Code, GitHub Copilot, hooks, prompts, internal tooling",
      ownership:
        "Owned AI workflow rollout, onboarding assets, skills/instructions patterns, and practical guidance for production-safe usage.",
    },
    snapshot: {
      goal: "Turn AI coding tools into a durable engineering advantage across multiple teams, repos, and delivery contexts.",
      challenge:
        "Teams needed higher output without losing review quality, security posture, or confidence in generated code. Generic prompting was not enough.",
      outcome:
        "Delivered a reusable enablement layer with repo-specific assets, training, and review-agent patterns that materially increased adoption and contribution velocity.",
    },
    metrics: [
      "10+ internal trainings delivered across prompting, agents, skills, hooks, and MCP integrations",
      "4x lift in tool adoption and contribution throughput across enabled workflows",
      "MR and security review agents integrated to safeguard higher AI-assisted output",
    ],
    tags: [
      "Agents",
      "Developer Experience",
      "Fintech",
      "Repo Automation",
      "Training",
    ],
    artifactLinks: [
      {
        label: "Redacted System Writeup",
        kind: "writeup",
        href: "/projects/mastercard-ai-enablement",
        note: "Public-safe summary of the rollout and workflow model.",
      },
      {
        label: "Architecture Decisions",
        kind: "notes",
        href: "/projects/mastercard-ai-enablement",
        note: "Shows enablement structure without exposing internal code.",
      },
    ],
    architecture: [
      {
        title: "Repo-ready AI onboarding layer",
        summary:
          "Each codebase received instructions, skills, prompts, and hooks shaped around the repo instead of relying on generic assistant behavior.",
        bullets: [
          "Repo context was front-loaded so assistants were useful immediately after setup.",
          "Workflows were connected to merge request review and security checks to control risk.",
          "Training material reinforced the same patterns that the tooling encoded.",
        ],
      },
      {
        title: "Adoption loop",
        summary:
          "The program was treated like product work: onboarding, training, usage, feedback, and refinement instead of one-time enablement.",
        bullets: [
          "Teams were trained on specific use cases, not just tool features.",
          "Assets were refined from real repo friction and team feedback.",
          "Quality controls were part of the workflow, not an afterthought.",
        ],
      },
    ],
    decisions: [
      {
        title: "Bias toward repo-specific workflows over generic prompting",
        summary:
          "The quickest way to make assistants trustworthy was to encode context, standards, and expectations close to the codebase.",
      },
      {
        title: "Treat output quality as a systems problem",
        summary:
          "Review agents and security hooks were required complements to higher generation speed so the org could scale usage safely.",
      },
    ],
    codeHighlights: [
      {
        title: "Agent workflow pattern",
        snippet:
          "1. Load repo instructions and standards.\n2. Pull ticket and documentation context.\n3. Propose a plan before editing.\n4. Run implementation with review hooks enabled.\n5. Generate test notes, MR summary, and follow-up tasks.",
        commentary:
          "The real value was not a single prompt. It was the repeatable workflow around context, edits, checks, and delivery.",
      },
    ],
  },
  {
    slug: "partner-onboarding-platform",
    name: "Partner Onboarding Platform",
    category: "product-engineering",
    company: "Mastercard",
    status: "in-progress",
    updatedAt: "2026-04",
    summary:
      "New client-facing onboarding experience for open finance partners designed to dramatically reduce friction, speed up enrollment, and improve sales motion.",
    headline:
      "A modern onboarding surface built to compete directly in a complex open finance market.",
    featured: true,
    confidentiality: "redacted",
    overview: {
      role: "Senior engineer on architecture and client application delivery",
      scope: "Architecture, client UI, onboarding flow design, execution leadership",
      stack: "React, TypeScript, platform integrations, internal APIs",
      ownership:
        "Led architecture direction and owned the customer-facing application experience end to end.",
    },
    snapshot: {
      goal: "Compress partner onboarding into a faster, clearer path that reduces clicks, removes ambiguity, and gets customers live sooner.",
      challenge:
        "The domain is operationally dense, competitive, and tightly coupled to existing platform behavior. The new flow had to feel simpler without hiding important complexity.",
      outcome:
        "Still in progress, with internal projections showing substantially faster onboarding and a meaningful increase in sales leverage once released.",
    },
    metrics: [
      "Projected 6x faster onboarding relative to existing partner flows",
      "Projected 5x sales lift through a more competitive customer entry point",
      "Reduced click-path complexity across core onboarding actions",
    ],
    tags: [
      "React",
      "Fintech",
      "Architecture",
      "Customer Experience",
      "Execution",
    ],
    artifactLinks: [
      {
        label: "Redacted Architecture Summary",
        kind: "diagram",
        href: "/projects/partner-onboarding-platform",
        note: "Public-safe system overview and key tradeoffs.",
      },
      {
        label: "Delivery Notes",
        kind: "notes",
        href: "/projects/partner-onboarding-platform",
        note: "How architecture and UX were balanced in a high-stakes flow.",
      },
    ],
    architecture: [
      {
        title: "Customer-facing onboarding flow",
        summary:
          "The application was designed to reduce visible complexity while still coordinating with a large existing platform underneath.",
        bullets: [
          "Flow structure optimized around fewer decisions and less repeated data entry.",
          "UI choices were made alongside platform and integration constraints, not after them.",
          "Architecture had to support future extension without reintroducing the original friction.",
        ],
      },
    ],
    decisions: [
      {
        title: "Build the client experience around task completion, not platform structure",
        summary:
          "The product should feel like a guided sequence for the customer, even if backend dependencies are broader and messier.",
      },
      {
        title: "Own UI and architecture together",
        summary:
          "Separating architecture decisions from the customer flow would have created fidelity loss and hidden cost in later implementation.",
      },
    ],
  },
  {
    slug: "react-mfe-angular-shell",
    name: "React Micro-Frontend in Angular Shell",
    category: "platform",
    company: "Mastercard",
    status: "shipped",
    updatedAt: "2025-11",
    summary:
      "Integrated a modern React micro-frontend into a critical legacy Angular platform without breaking auth, routing, session behavior, or delivery cadence.",
    headline:
      "A bridge between modern frontend delivery and a business-critical legacy application.",
    confidentiality: "redacted",
    overview: {
      role: "Software engineer",
      scope: "Frontend architecture, integration strategy, release coordination",
      stack: "React, Angular, TypeScript, Module Federation, shared platform services",
      ownership:
        "Worked on architecture and implementation needed to make the new React experience coexist with a complex legacy shell.",
    },
    snapshot: {
      goal: "Create a path for modern React product surfaces inside a critical Angular application without forcing a full rewrite.",
      challenge:
        "State, packages, auth, session management, routing, deployment behavior, and design consistency all crossed framework boundaries.",
      outcome:
        "Delivered a workable integration model that let new product work ship in React while respecting legacy platform realities.",
    },
    metrics: [
      "Enabled new React delivery inside a critical legacy product",
      "Handled cross-framework concerns spanning auth, session management, and routing",
      "Reduced rewrite pressure by creating an incremental modernization path",
    ],
    tags: [
      "Angular",
      "React",
      "Module Federation",
      "Modernization",
      "System Integration",
    ],
    artifactLinks: [
      {
        label: "Redacted Integration Writeup",
        kind: "writeup",
        href: "/projects/react-mfe-angular-shell",
        note: "Public-safe account of the migration and integration challenges.",
      },
    ],
    architecture: [
      {
        title: "Incremental modernization path",
        summary:
          "The project created a bridge layer so new React surfaces could live inside the legacy application rather than waiting on a risky rewrite.",
        bullets: [
          "Integration had to preserve shared session and authentication behavior.",
          "Routing and state boundaries needed to feel coherent to users.",
          "Release coordination mattered as much as code structure.",
        ],
      },
    ],
    decisions: [
      {
        title: "Optimize for coexistence first, replacement later",
        summary:
          "The right first move was not a rewrite. It was a stable path for incremental product delivery with bounded risk.",
      },
    ],
  },
  {
    slug: "caret-ai-legal-assistant",
    name: "CARET AI Legal Assistant",
    category: "ai-systems",
    company: "CARET",
    status: "shipped",
    updatedAt: "2024-05",
    summary:
      "Early AI legal workflow assistant built around case documents, project context, and grounded prompting before legal AI became a crowded category.",
    headline:
      "A document-grounded assistant for legal research and case work in the GPT-3 era.",
    featured: true,
    confidentiality: "redacted",
    overview: {
      role: "Associate software engineer",
      scope: "AI integration, backend + UI collaboration, contextual response workflows",
      stack: "LLM APIs, document metadata, application backend, frontend integration",
      ownership:
        "Built and integrated the assistant experience across the application stack, including prompt logic and context selection behavior.",
    },
    snapshot: {
      goal: "Help legal users ask natural questions and receive grounded answers based on case documents and project context already inside the platform.",
      challenge:
        "Model capability was early, context windows were smaller, and hallucination risk was unacceptable in a legal setting.",
      outcome:
        "Delivered a novel assistant for its time by selecting context deliberately, structuring prompts carefully, and keeping responses tied to documents and known legal practice.",
    },
    metrics: [
      "Built when GPT-3 era constraints made context selection and prompting far more manual",
      "Grounded responses in case summaries, titles, and selected documents from project data",
      "Added safeguards to reduce hallucination risk in a trust-sensitive domain",
    ],
    tags: ["LLM Integration", "Legal Tech", "Prompting", "Context Management"],
    artifactLinks: [
      {
        label: "Public-safe Product Writeup",
        kind: "writeup",
        href: "/projects/caret-ai-legal-assistant",
        note: "Focuses on context strategy and trust model, not internal code.",
      },
    ],
    architecture: [
      {
        title: "Document-grounded response flow",
        summary:
          "The assistant used case summaries and metadata to decide which documents to pull into the prompt so answers stayed tied to case context.",
        bullets: [
          "Titles and summaries acted as a routing layer for context selection.",
          "Prompt construction favored grounding and restraint over broad open-ended generation.",
          "Trust came from bounded context, not model confidence alone.",
        ],
      },
    ],
    decisions: [
      {
        title: "Select context before prompting",
        summary:
          "Given the limitations of early models, deliberate document selection mattered more than trying to dump everything into a single prompt.",
      },
      {
        title: "Design for restraint in a legal domain",
        summary:
          "The product needed to answer from evidence and accepted practice, not improvise.",
      },
    ],
  },
  {
    slug: "spreadsheet-engine",
    name: "Spreadsheet Engine",
    category: "platform",
    status: "live-demo",
    updatedAt: "2026-04",
    summary:
      "A spreadsheet engine with formula evaluation, dependency tracking, circular reference handling, and tests. Old repo, but still one of the clearest public examples of how I structure logic-heavy code.",
    headline:
      "Public proof of core engineering habits: data structures, evaluation logic, boundaries, and tests.",
    featured: true,
    confidentiality: "public",
    overview: {
      role: "Solo developer",
      scope: "Core logic, parser/evaluator work, dependency management, tests",
      stack: "C#, .NET, unit tests",
      ownership:
        "Built the spreadsheet model, formula handling, dependency graph behavior, and supporting tests.",
    },
    snapshot: {
      goal: "Implement the core behavior of a spreadsheet system with enough rigor to manage formulas, dependencies, and invalid states correctly.",
      challenge:
        "The hard part was not the grid. It was evaluation order, dependency tracking, circular reference detection, and keeping responsibilities separated.",
      outcome:
        "Produced a clean public artifact that still shows how I think about decomposition, correctness, and testability.",
    },
    metrics: [
      "Supports formula evaluation and dependency graphs",
      "Handles circular dependency and invalid formula cases",
      "Includes multiple test projects around evaluator and spreadsheet behavior",
    ],
    tags: ["C#", "Data Structures", "Testing", "Parsing", "Public Repo"],
    artifactLinks: [
      {
        label: "GitHub Repository",
        kind: "repo",
        href: "https://github.com/TateRCXVII/my-spreadsheet",
      },
      {
        label: "Project Notes",
        kind: "writeup",
        href: "/projects/spreadsheet-engine",
        note: "Portfolio framing for why this repo still matters.",
      },
    ],
    architecture: [
      {
        title: "Dependency-driven evaluation",
        summary:
          "The spreadsheet separates formula handling, dependency tracking, and evaluation so updates propagate correctly and invalid states can be contained.",
        bullets: [
          "Dependency graph tracks relationships between referenced cells.",
          "Evaluation logic can reject circular references before they become runtime confusion.",
          "Structure favors testability over tightly coupled GUI-first code.",
        ],
      },
    ],
    decisions: [
      {
        title: "Keep formula logic and graph logic separate",
        summary:
          "Spreadsheet correctness depends on clear boundaries between parsing, dependency management, and resulting value updates.",
      },
    ],
    codeHighlights: [
      {
        title: "Formula and dependency boundaries",
        file: "Formula / DependencyGraph",
        snippet:
          "Capabilities include:\n- Evaluating formulas\n- Building dependency graphs\n- Detecting circular dependencies\n- Validating cell variables and contents",
        commentary:
          "This repo is valuable because the responsibilities are explicit. Even as an older project, it shows the foundations I still care about.",
      },
    ],
  },
  {
    slug: "quant-research-lab",
    name: "Quant Research Lab",
    category: "research",
    status: "in-progress",
    updatedAt: "2026-04",
    summary:
      "A new research track for market-data pipelines, backtests, and technical writeups. This section is intentionally honest: it is active work, not retroactive branding.",
    headline:
      "An active research lane for quantitative engineering, trading systems, and market experiments.",
    confidentiality: "public",
    overview: {
      role: "Researcher and builder",
      scope: "Market data, experimentation, analysis, technical notes",
      stack: "Python, notebooks, market APIs, data pipelines",
      ownership:
        "Defining the project from scratch as a public body of work around quant systems and disciplined experimentation.",
    },
    snapshot: {
      goal: "Build a credible body of public work in quantitative engineering through small but real systems, experiments, and documented decisions.",
      challenge:
        "The challenge is to stay rigorous and honest. The portfolio should show active research, not pretend this is already a mature trading platform.",
      outcome:
        "This will evolve into notebooks, architecture diagrams, and experiment writeups that make the research process visible.",
    },
    metrics: [
      "Initial lane defined as active research instead of overstated production expertise",
      "Planned outputs include factor experiments, data pipelines, and backtest notes",
      "Will feed the library section with diagrams and research writeups",
    ],
    tags: ["Quant", "Research", "Python", "Market Data", "Experiments"],
    artifactLinks: [
      {
        label: "Research Track",
        kind: "notes",
        href: "/projects/quant-research-lab",
        note: "This project is a public commitment to build the lane seriously.",
      },
    ],
    decisions: [
      {
        title: "Present as active research",
        summary:
          "The portfolio should show ambition and trajectory here without claiming production experience that does not exist yet.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((project) => project.category === category);
}

export const categoryLabels: Record<string, string> = {
  all: "All",
  "ai-systems": "AI Systems",
  platform: "Platform",
  "product-engineering": "Product Engineering",
  research: "Research",
  security: "Security",
};

export const categoryCounts: Record<string, number> = {
  all: projects.length,
  "ai-systems": projects.filter((project) => project.category === "ai-systems").length,
  platform: projects.filter((project) => project.category === "platform").length,
  "product-engineering": projects.filter(
    (project) => project.category === "product-engineering"
  ).length,
  research: projects.filter((project) => project.category === "research").length,
  security: projects.filter((project) => project.category === "security").length,
};
