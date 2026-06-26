import { registerCommand } from "./registry";

registerCommand("about", "Learn about Tate Reynolds", () => {
  const output = [
    "┌─────────────────────────────────────────────┐",
    "│  Tate Reynolds                               │",
    "│  Senior AI Software Engineer                 │",
    "│                                              │",
    "│  I build AI-enabled developer systems,       │",
    "│  full-stack product experiences, and         │",
    "│  architecture-driven platform work.          │",
    "│                                              │",
    "│  Based in Salt Lake City, Utah.              │",
    "│  Focus: fintech, tooling, and systems.       │",
    "└─────────────────────────────────────────────┘",
  ].join("\n");

  return { output };
});
