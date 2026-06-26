import type { LibraryEntry } from "./types";

export const caseStudies: LibraryEntry[] = [
  {
    slug: "ai-enablement-architecture",
    title: "AI Enablement as a System",
    subtitle: "From individual prompts to team-wide development loops",
    category: "architecture-diagram",
    bookColor: {
      spine: "#0f172a",
      cover: "#111827",
      accent: "#22c55e",
      pages: "#f8fafc",
    },
    metadata: {
      format: "Architecture diagram + notes",
      context: "Developer tooling / fintech",
      takeaway:
        "The durable advantage is not one model or one prompt. It is the workflow around context, review, safety, and adoption.",
    },
    toc: [
      {
        section: "01",
        title: "System Shape",
        subsections: [
          { id: "why-system-not-tool", title: "Why a System, Not a Tool", page: 4 },
          { id: "workflow-layers", title: "Workflow Layers", page: 10 },
        ],
      },
      {
        section: "02",
        title: "Adoption",
        subsections: [
          { id: "training-loop", title: "Training Loop", page: 18 },
          { id: "quality-controls", title: "Quality Controls", page: 24 },
        ],
      },
    ],
    content: [
      {
        id: "why-system-not-tool",
        heading: "Why a System, Not a Tool",
        body:
          "Teams rarely fail to adopt AI coding tools because the model is bad. They fail because the surrounding workflow is vague. Engineers need to know what context gets loaded, where quality is enforced, what the safe use cases are, and how the work folds back into tickets, reviews, and documentation.\n\nThat is why I think about AI enablement as a system design problem. The tool is only one component. The stronger asset is the set of instructions, hooks, review agents, conventions, and training material that make the tool useful in the same way twice.",
      },
      {
        id: "workflow-layers",
        heading: "Workflow Layers",
        body:
          "A practical enablement stack usually has five layers: repo context, task context, generation workflow, quality controls, and delivery output. Repo context keeps the assistant grounded in the codebase. Task context connects it to documentation and tickets. Generation workflow shapes how work begins. Quality controls constrain risk. Delivery output turns the session into something a human reviewer can trust.\n\nWhen one of these layers is missing, adoption becomes personality-driven rather than system-driven. A few power users get leverage and everyone else gets inconsistent results.",
      },
      {
        id: "training-loop",
        heading: "Training Loop",
        body:
          "Training should not be a detached slide deck. It should teach the exact workflow the team is expected to use. The best sessions pair examples from the real codebase with concrete guardrails, so engineers leave with habits they can apply the same day.\n\nI prefer a loop of training, adoption, observation, and refinement. Teams try the workflow, friction appears, then the assets improve. That is what makes AI enablement compound.",
      },
      {
        id: "quality-controls",
        heading: "Quality Controls",
        body:
          "The higher the output, the more important quality systems become. Merge request review agents, security checks, and repo-specific constraints are not optional extras. They are what allow the organization to benefit from speed without drifting into low-trust output.\n\nThis is also the point where AI stops being a novelty and starts behaving like an engineering capability.",
      },
    ],
  },
  {
    slug: "honey-bees-and-data-stories",
    title: "Honey Bees and Data Stories",
    subtitle: "Turning a college data project into a signal about how I think",
    category: "technical-essay",
    bookColor: {
      spine: "#5b3a1a",
      cover: "#7c4a1d",
      accent: "#f5b942",
      pages: "#fffaf0",
    },
    metadata: {
      format: "Technical essay",
      context: "Data compilation / public research artifact",
      takeaway:
        "Even an older data project can be valuable if it shows curiosity, structure, and the ability to explain patterns clearly.",
    },
    toc: [
      {
        section: "01",
        title: "Why Keep Old Work",
        subsections: [
          { id: "signal-in-older-work", title: "Signal in Older Work", page: 4 },
          { id: "from-classwork-to-portfolio", title: "From Classwork to Portfolio", page: 9 },
        ],
      },
      {
        section: "02",
        title: "What It Shows",
        subsections: [
          { id: "data-curiosity", title: "Data Curiosity", page: 16 },
          { id: "clear-explanation", title: "Clear Explanation", page: 22 },
        ],
      },
    ],
    content: [
      {
        id: "signal-in-older-work",
        heading: "Signal in Older Work",
        body:
          "Not every public artifact has to be recent to be useful. Some older projects still reveal habits that matter now: how you organize a problem, what you choose to measure, and whether you can turn raw analysis into a readable story.\n\nThe honey bee project is not here because it is a cornerstone of my present-day engineering identity. It is here because it captures a pattern that still holds: I like taking a messy dataset, asking a real question, and making the answer legible.",
      },
      {
        id: "from-classwork-to-portfolio",
        heading: "From Classwork to Portfolio",
        body:
          "Coursework usually becomes portfolio noise when it stays trapped in the language of the assignment. It becomes useful again when you reinterpret it through the lens of what it demonstrates. In this case: curiosity about systems, comfort with data, and an instinct to explain rather than merely compute.\n\nThat is the standard I want for the library section going forward. A piece belongs here when it shows how I think, not simply that I completed it.",
      },
      {
        id: "data-curiosity",
        heading: "Data Curiosity",
        body:
          "The thread that connects older data work to newer engineering work is simple: I want to understand the system behind the visible behavior. With bees, that meant asking what the data said about production and variation. In product work, it means asking what a workflow or metric actually reveals about user and team behavior.",
      },
      {
        id: "clear-explanation",
        heading: "Clear Explanation",
        body:
          "Analysis is only half the job. The other half is turning it into a form another person can use. That instinct later became useful in technical writing, architecture discussions, and AI training. The portfolio should make that continuity visible.",
      },
    ],
  },
  {
    slug: "quant-lab-research-notes",
    title: "Quant Research Notes",
    subtitle: "The beginning of a serious market systems practice",
    category: "research-note",
    bookColor: {
      spine: "#1d3557",
      cover: "#264653",
      accent: "#8ecae6",
      pages: "#f1f5f9",
    },
    metadata: {
      format: "Research note",
      context: "Quantitative engineering",
      takeaway:
        "The honest starting point is to publish questions, experiments, and architecture diagrams before claiming deep production experience.",
    },
    toc: [
      {
        section: "01",
        title: "Scope",
        subsections: [
          { id: "why-start-small", title: "Why Start Small", page: 4 },
          { id: "first-systems", title: "First Systems to Build", page: 10 },
        ],
      },
      {
        section: "02",
        title: "Research Discipline",
        subsections: [
          { id: "avoiding-fake-expertise", title: "Avoiding Fake Expertise", page: 18 },
          { id: "publish-the-process", title: "Publish the Process", page: 24 },
        ],
      },
    ],
    content: [
      {
        id: "why-start-small",
        heading: "Why Start Small",
        body:
          "Quant systems are attractive partly because they are easy to overstate. There is always a temptation to jump directly to portfolio optimization, execution engines, or broad claims about alpha. That is exactly why I want the portfolio to show the smaller, more rigorous start.\n\nA strong beginning is better than inflated expertise: market-data ingestion, clean factor experiments, backtest assumptions written down clearly, and architecture diagrams that show I understand the moving parts.",
      },
      {
        id: "first-systems",
        heading: "First Systems to Build",
        body:
          "The first public quant systems should be modest but real. A market-data pipeline with reproducible storage. A notebook that tests a simple factor or signal and explains its assumptions. A writeup on backtest hygiene. An architecture diagram that distinguishes research, simulation, and execution concerns.\n\nThose artifacts are enough to build a serious lane over time.",
      },
      {
        id: "avoiding-fake-expertise",
        heading: "Avoiding Fake Expertise",
        body:
          "I would rather publish a narrow experiment I can defend than a wide project that is mostly aesthetic. In quant work, credibility comes from assumptions, controls, and restraint. That same discipline makes a portfolio better too.",
      },
      {
        id: "publish-the-process",
        heading: "Publish the Process",
        body:
          "One advantage of the library section is that it can hold in-progress thinking. Not everything needs to be a finished product. Some of the most valuable signals are the research notes, questions, and decisions that show a body of work forming in public.",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): LibraryEntry | undefined {
  return caseStudies.find((entry) => entry.slug === slug);
}
