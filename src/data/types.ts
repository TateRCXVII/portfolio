export interface ProjectArtifact {
  label: string;
  kind: "repo" | "writeup" | "diagram" | "demo" | "notes";
  href: string;
  note?: string;
}

export interface ProjectArchitecture {
  title: string;
  summary: string;
  bullets: string[];
}

export interface ProjectDecision {
  title: string;
  summary: string;
}

export interface CodeHighlight {
  title: string;
  file?: string;
  snippet: string;
  commentary: string;
}

export interface Project {
  slug: string;
  name: string;
  category:
    | "ai-systems"
    | "platform"
    | "product-engineering"
    | "research"
    | "security";
  company?: string;
  status: "shipped" | "in-progress" | "concept" | "live-demo";
  updatedAt: string;
  summary: string;
  headline: string;
  featured?: boolean;
  confidentiality: "public" | "redacted" | "internal";
  overview: {
    role: string;
    scope: string;
    stack: string;
    ownership: string;
  };
  snapshot: {
    goal: string;
    challenge: string;
    outcome: string;
  };
  metrics: string[];
  tags: string[];
  artifactLinks: ProjectArtifact[];
  architecture?: ProjectArchitecture[];
  decisions?: ProjectDecision[];
  codeHighlights?: CodeHighlight[];
}

export interface LibraryEntry {
  slug: string;
  title: string;
  subtitle?: string;
  category: "architecture-diagram" | "technical-essay" | "research-note";
  bookColor: {
    spine: string;
    cover: string;
    accent: string;
    pages: string;
  };
  metadata: {
    format: string;
    context: string;
    takeaway: string;
  };
  toc: {
    section: string;
    title: string;
    subsections: { id: string; title: string; page: number }[];
  }[];
  content: {
    id: string;
    heading: string;
    body: string;
  }[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  thesis: string;
  heroStats: {
    label: string;
    value: string;
    detail: string;
  }[];
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
