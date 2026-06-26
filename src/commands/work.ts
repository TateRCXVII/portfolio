import { registerCommand } from "./registry";
import { projects } from "@/data/projects";

function pad(str: string, length: number): string {
  if (str.length >= length) return str.slice(0, length - 1) + " ";
  return str + " ".repeat(length - str.length);
}

registerCommand("work", "Browse selected projects", () => {
  const header =
    pad("PROJECT", 28) + pad("TYPE", 22) + "STATUS";
  const divider = "─".repeat(28) + "─".repeat(22) + "─".repeat(12);

  const rows = projects.slice(0, 8).map((p) => {
    return pad(p.name, 28) + pad(p.category, 22) + p.status;
  });

  const output = [header, divider, ...rows].join("\n");
  return { output };
});
