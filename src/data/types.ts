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
