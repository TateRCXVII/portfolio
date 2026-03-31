import { registerCommand } from "./registry";

registerCommand("contact", "Get contact information", () => {
  const output = [
    "┌─────────────────────────────────────────────┐",
    "│  Contact                                     │",
    "│                                              │",
    "│  Email     tate@tatereynolds.com             │",
    "│  GitHub    github.com/tatereynolds            │",
    "│  LinkedIn  linkedin.com/in/tatereynolds       │",
    "│  Twitter   @tatereynolds                      │",
    "│                                              │",
    "│  Open to freelance, full-time, and           │",
    "│  collaboration opportunities.                 │",
    "└─────────────────────────────────────────────┘",
  ].join("\n");

  return { output };
});
