import { registerCommand } from "./registry";

registerCommand("contact", "Get contact information", () => {
  const output = [
    "┌─────────────────────────────────────────────┐",
    "│  Contact                                     │",
    "│                                              │",
    "│  Email     tate.reynolds@gmail.com           │",
    "│  GitHub    github.com/TateRCXVII             │",
    "│  Portfolio tatercxvii.github.io              │",
    "│  Location  Salt Lake City, UT                │",
    "│                                              │",
    "│  Open to senior engineering roles, AI        │",
    "│  platform work, and ambitious product teams. │",
    "└─────────────────────────────────────────────┘",
  ].join("\n");

  return { output };
});
