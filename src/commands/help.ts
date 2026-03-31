import { registerCommand, getAllCommands } from "./registry";

registerCommand("help", "List all available commands", () => {
  const cmds = getAllCommands();
  const lines = cmds.map((cmd) => {
    const name = `  /${cmd.name}`;
    const padded = name.padEnd(16);
    return padded + cmd.description;
  });
  const output = ["Available commands:", "", ...lines].join("\n");
  return { output };
});
