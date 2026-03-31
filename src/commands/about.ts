import { registerCommand } from "./registry";

registerCommand("about", "Learn about Tate Reynolds", () => {
  const output = [
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
  ].join("\n");

  return { output };
});
