import { registerCommand } from "./registry";
import { profile } from "@/data/profile";

function skillBar(score: number): string {
  const maxScore = 20;
  const barWidth = 20;
  const filled = Math.round((score / maxScore) * barWidth);
  const empty = barWidth - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

function pad(str: string, length: number): string {
  if (str.length >= length) return str.slice(0, length - 1) + " ";
  return str + " ".repeat(length - str.length);
}

registerCommand("skills", "View skill levels and tools", () => {
  const rows = profile.skills.map((skill) => {
    return pad(skill.name, 25) + skillBar(skill.score) + "  " + skill.score;
  });

  const toolsLine = "TOOLS: " + profile.tools.join(", ");

  const output = [...rows, "", toolsLine].join("\n");
  return { output };
});
