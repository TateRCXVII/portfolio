export interface CommandResult {
  output: string;
  isError?: boolean;
  isHtml?: boolean;
}

export type CommandHandler = (args: string[]) => CommandResult;

export interface Command {
  name: string;
  description: string;
  handler: CommandHandler;
}

const commands = new Map<string, Command>();

export function registerCommand(
  name: string,
  description: string,
  handler: CommandHandler
): void {
  commands.set(name.toLowerCase(), { name, description, handler });
}

export function getCommand(name: string): Command | undefined {
  return commands.get(name.toLowerCase().replace(/^\//, ""));
}

export function getAllCommands(): Command[] {
  return Array.from(commands.values());
}

export function getCommandNames(): string[] {
  return Array.from(commands.keys());
}
