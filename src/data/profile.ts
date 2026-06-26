import type { Profile } from "./types";

export const profile: Profile = {
  name: "Tate Reynolds",
  title: "Senior AI Software Engineer",
  location: "Salt Lake City, Utah",
  thesis:
    "I build AI-enabled developer systems, full-stack products, and internal platforms that reduce engineering friction and create measurable business leverage across fintech, legal tech, and SaaS.",

  heroStats: [
    {
      label: "AI Trainings Delivered",
      value: "10+",
      detail:
        "Led hands-on enablement sessions across agents, prompting, skills, MCP integrations, and production-safe AI workflows.",
    },
    {
      label: "Developer Velocity Lift",
      value: "4x",
      detail:
        "Improved contribution throughput and AI tool adoption through repo-ready agent scaffolding, review hooks, and team-specific workflows.",
    },
    {
      label: "Projected Onboarding Lift",
      value: "6x",
      detail:
        "Built a new onboarding experience designed to cut clicks dramatically and accelerate partner enrollment in open finance.",
    },
  ],

  identityCards: [
    {
      icon: "Bot",
      label: "AI Systems Builder",
      description:
        "I build practical AI systems for engineers, not slideware. My work lives in hooks, prompts, eval habits, code review loops, documentation pipelines, and productized workflows that save teams real time.",
      tags: ["Agents", "Hooks", "Prompts", "Developer Tooling"],
      backContent:
        "At Mastercard Open Finance, I helped teams move from curiosity about AI coding tools to repeatable systems. The goal was never novelty. It was adoption, quality, speed, and trust in environments where output still had to clear real security and review standards.",
    },
    {
      icon: "Layers3",
      label: "Full-Stack Product Engineer",
      description:
        "I like work that spans architecture, frontend polish, backend reasoning, and delivery. I am strongest when a product needs both systems thinking and someone willing to finish the hard edges.",
      tags: ["React", "Next.js", "Node.js", "Platform Design"],
      backContent:
        "Across fintech, legal tech, and SaaS, I have worked on customer-facing apps, internal admin systems, payments, and AI experiences. I like owning real surfaces that users touch while still understanding the data, platform, and delivery concerns underneath them.",
    },
    {
      icon: "Mountain",
      label: "Salt Lake Native",
      description:
        "Salt Lake City shaped how I work. The Wasatch taught me patience, route finding, and respect for systems bigger than I am.",
      tags: ["Wasatch", "Climbing", "Skiing", "Photography"],
      backContent:
        "I have only ever lived in Salt Lake City, and I want the portfolio to feel rooted there. Alpine starts, canyon drives, granite, snow, and the structure of the mountains all influence how I think about craft, resilience, and long-horizon work.",
    },
    {
      icon: "Music4",
      label: "Creative Discipline",
      description:
        "Outside software, I write, make music, climb, ski, and take photos. Those are not side quests. They sharpen taste, timing, patience, and the ability to keep iterating until something feels true.",
      tags: ["Writing", "Music", "Taste", "Craft"],
      backContent:
        "The personal section of this site is intentionally light, but it matters. The same part of me that practices climbing movement, edits photos, or works through a musical phrase is the part that cares about architecture decisions, clean interfaces, and how systems feel to use.",
    },
  ],

  persona: [
    { axis: "Systems Thinking", value: 94 },
    { axis: "Execution", value: 91 },
    { axis: "Curiosity", value: 95 },
    { axis: "Leadership", value: 87 },
    { axis: "Craft", value: 89 },
  ],

  goals: [
    "Build AI tooling that makes excellent engineering work easier to start, safer to scale, and faster to ship.",
    "Lead technical initiatives that connect product direction, architecture, and execution without losing momentum.",
    "Publish more architecture diagrams, research notes, and system writeups that show how I think, not just what I shipped.",
  ],

  experience: [
    {
      city: "Salt Lake City",
      lat: 40.7608,
      lng: -111.891,
      label: "Home base for the work and the life: engineering, mountains, writing, and long projects.",
    },
    {
      city: "Wasatch Front",
      lat: 40.6461,
      lng: -111.8641,
      label: "The range that shaped the portfolio mood: steep terrain, disciplined movement, and clear lines.",
    },
    {
      city: "Big Cottonwood",
      lat: 40.6333,
      lng: -111.8,
      label: "Climbing, skiing, and the kind of repetition that builds real craft over time.",
    },
  ],

  testimonials: [
    {
      name: "Engineering Manager",
      title: "Open Finance Leadership",
      company: "Mastercard",
      quote:
        "Tate brings depth, range, and real initiative. He contributes meaningfully in architecture conversations, asks the questions that improve the room, and consistently turns ideas into shipped work.",
    },
    {
      name: "Principal Engineer",
      title: "AI Enablement Partner",
      company: "Mastercard",
      quote:
        "Tate is unusually strong at translating fast-moving AI tooling into workflows a broader engineering organization can actually use. His training style is clear, practical, and grounded in real delivery constraints.",
    },
    {
      name: "Product Collaborator",
      title: "Cross-Functional Partner",
      company: "Fintech Platform Team",
      quote:
        "He can take an abstract initiative, break it into actionable work, ask the right product questions, and then go build the thing. That combination is rare and it makes him valuable early in a project.",
    },
    {
      name: "Teammate",
      title: "Software Engineer",
      company: "Platform Engineering",
      quote:
        "Tate is thoughtful, personable, and technically sharp. He raises the level of the team without making collaboration feel heavy, and people trust him with both execution and judgment.",
    },
  ],

  skills: [
    { name: "AI Developer Tooling", score: 18 },
    { name: "Full-Stack Product Work", score: 17 },
    { name: "React / Next.js", score: 15 },
    { name: "Architecture & Systems", score: 14 },
    { name: "Developer Experience", score: 13 },
    { name: "Prompt / Agent Design", score: 12 },
    { name: "Platform Integration", score: 11 },
    { name: "Technical Writing", score: 9 },
    { name: "Data / Research", score: 7 },
    { name: "Quant Experiments", score: 4 },
  ],

  tools: [
    "Codex",
    "Claude Code",
    "GitHub Copilot",
    "OpenAI API",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "Docker",
  ],
};
