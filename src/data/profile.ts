import type { Profile } from "./types";

export const profile: Profile = {
  name: "Tate Reynolds",
  title: "Software Engineer",
  hoursSpent: 14238,

  identityCards: [
    {
      icon: "Palette",
      label: "Inspired by Art",
      description:
        "I grew up drawing and painting before I ever touched a keyboard. That foundation shapes how I see design — as craft with intention, not decoration.",
      tags: ["Fine Art", "Typography", "Generative Art", "Photography"],
      backContent:
        "From oil painting to pixel grids, my obsession with composition and color theory has never left me. I carry a sketchbook everywhere and fill it with everything from gesture drawings to system diagrams.",
    },
    {
      icon: "Code2",
      label: "Curiosity = Dev",
      description:
        "I taught myself to code because I was tired of handing off designs and wondering what happened to them. Now I build the things I design.",
      tags: ["JavaScript", "React", "Next.js", "HTML/CSS"],
      backContent:
        "Learning to code changed how I design. Understanding constraints — what is hard to build, what is easy — made me a better collaborator and a sharper designer. I write real code, not just pseudo-code in Figma.",
    },
    {
      icon: "MousePointer",
      label: "Product Designer",
      description:
        "I design end-to-end product experiences — from discovery and research through interaction design, design systems, and developer handoff.",
      tags: [
        "UX Research",
        "Interaction Design",
        "Design Systems",
        "Prototyping",
      ],
      backContent:
        "My design practice is grounded in research but expressed through craft. I believe beautiful things work better — not because beauty is the goal, but because the attention required to make something beautiful forces you to resolve every detail.",
    },
    {
      icon: "PersonStanding",
      label: "People",
      description:
        "The best design work I have done happened in deep collaboration. I believe in critique, in disagreement, and in the compounding effect of good teams.",
      tags: ["Mentorship", "Cross-functional", "Facilitation", "Writing"],
      backContent:
        "I have been lucky to work with engineers, data scientists, marketers, and executives who taught me things design school never could. I try to pay that forward through mentorship, documentation, and writing about my practice.",
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
    "Build products that survive contact with real users — designed with rigor, shipped with care, and improved through feedback.",
    "Grow into engineering leadership that bridges design and development, reducing the fidelity loss between vision and implementation.",
    "Contribute to the practice of design through writing, open-source tooling, and mentorship that makes the next generation sharper.",
  ],

  experience: [
    {
      city: "Boston",
      lat: 42.3601,
      lng: -71.0589,
      label: "Studied at Northeastern University — design & computer science.",
    },
    {
      city: "New York",
      lat: 40.7128,
      lng: -74.006,
      label: "Early career at a product agency — shipping fast, learning faster.",
    },
    {
      city: "San Francisco",
      lat: 37.7749,
      lng: -122.4194,
      label: "Joined Bolster — building AI cybersecurity products at scale.",
    },
    {
      city: "Shanghai",
      lat: 31.2304,
      lng: 121.4737,
      label: "Remote design sprint with an international engineering team.",
    },
  ],

  testimonials: [
    {
      name: "Maya Chen",
      title: "Director of Product Management",
      company: "Bolster",
      quote:
        "Tate has a rare ability to hold both the big-picture strategy and the pixel-level detail simultaneously. The Signal redesign shipped on time, earned a G2 Leader badge, and generated exactly zero revision requests from the executive team — that never happens.",
    },
    {
      name: "Dr. Amir Siddiqui",
      title: "VP of AI Research",
      company: "Bolster",
      quote:
        "What sets Tate apart is that he understands the ML pipeline well enough to design for it. When the Abuse Mailbox misclassification issue surfaced, he diagnosed it as a design problem before any engineer did — and his fix improved model performance metrics we had been chasing for a year.",
    },
    {
      name: "Rachel Torres",
      title: "VP of Design",
      company: "Andreessen Horowitz",
      quote:
        "Tate's portfolio demonstrates something rare at his career stage: a consistent point of view. His work is not a collection of style exercises — it is evidence of a designer who has developed a philosophy and applies it with discipline.",
    },
    {
      name: "Jordan Park",
      title: "Product Designer",
      company: "Figma",
      quote:
        "I had the chance to collaborate with Tate on a design system audit and his process was meticulous without being precious. He gave hard feedback clearly, received it gracefully, and shipped work that made both our systems better.",
    },
  ],

  skills: [
    { name: "Interaction Design", score: 18 },
    { name: "Visual Design", score: 15 },
    { name: "Design Systems", score: 14 },
    { name: "UX Research", score: 12 },
    { name: "Prototyping", score: 10 },
    { name: "Front-end Development", score: 9 },
    { name: "Data Visualization", score: 8 },
    { name: "Product Strategy", score: 7 },
    { name: "Motion Design", score: 5 },
    { name: "Brand Design", score: 2 },
  ],

  tools: [
    "Figma",
    "ProtoPie",
    "Framer",
    "JavaScript",
    "jQuery",
    "HTML",
    "CSS",
    "Adobe CC",
  ],
};
