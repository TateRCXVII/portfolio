import { getCommand, getCommandNames } from "@/commands/registry";

export type TerminalLine = {
  id: string;
  type: "input" | "output" | "welcome" | "error";
  content: string;
  isHtml?: boolean;
};

const ASCII_ART = `╔╦╗╔═╗╔╦╗╔═╗  ╦═╗╔═╗╦ ╦╔╗╔╔═╗╦  ╔╦╗╔═╗
 ║ ╠═╣ ║ ║╣   ╠╦╝║╣ ╚╦╝║║║║ ║║   ║║╚═╗
 ╩ ╩ ╩ ╩ ╚═╝  ╩╚═╚═╝ ╩ ╝╚╝╚═╝╩═╝═╩╝╚═╝`;

let lineCounter = 0;
function makeId(): string {
  return `line-${++lineCounter}-${Date.now()}`;
}

export class TerminalEngine {
  private lines: TerminalLine[] = [];
  private history: string[] = [];
  private historyIndex = -1;
  private onUpdate: (lines: TerminalLine[]) => void;

  constructor(onUpdate: (lines: TerminalLine[]) => void) {
    this.onUpdate = onUpdate;
    this.showWelcome();
  }

  private showWelcome(): void {
    this.lines = [
      {
        id: makeId(),
        type: "welcome",
        content: ASCII_ART,
      },
      {
        id: makeId(),
        type: "welcome",
        content: "Welcome, visitor.",
      },
      {
        id: makeId(),
        type: "welcome",
        content: "Type /help for available commands.",
      },
    ];
    this.onUpdate([...this.lines]);
  }

  execute(input: string): void {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add input line
    this.lines.push({
      id: makeId(),
      type: "input",
      content: trimmed,
    });

    // Record history
    if (this.history[0] !== trimmed) {
      this.history.unshift(trimmed);
      if (this.history.length > 100) this.history.pop();
    }
    this.historyIndex = -1;

    // Parse command
    const parts = trimmed.split(/\s+/);
    const commandName = parts[0];
    const args = parts.slice(1);

    const command = getCommand(commandName);
    if (!command) {
      this.lines.push({
        id: makeId(),
        type: "error",
        content: `Command not found: ${commandName}. Type /help for available commands.`,
      });
    } else {
      const result = command.handler(args);
      this.lines.push({
        id: makeId(),
        type: result.isError ? "error" : "output",
        content: result.output,
        isHtml: result.isHtml,
      });
    }

    this.onUpdate([...this.lines]);
  }

  getHistoryUp(): string | null {
    if (this.history.length === 0) return null;
    this.historyIndex = Math.min(
      this.historyIndex + 1,
      this.history.length - 1
    );
    return this.history[this.historyIndex];
  }

  getHistoryDown(): string | null {
    if (this.historyIndex <= 0) {
      this.historyIndex = -1;
      return "";
    }
    this.historyIndex--;
    return this.history[this.historyIndex];
  }

  getTabCompletion(partial: string): string | null {
    const cleaned = partial.toLowerCase().replace(/^\//, "");
    if (!cleaned) return null;
    const names = getCommandNames();
    const match = names.find((n) => n.startsWith(cleaned));
    return match ? `/${match}` : null;
  }

  clear(): void {
    this.lines = [];
    this.showWelcome();
  }

  getLines(): TerminalLine[] {
    return [...this.lines];
  }
}
