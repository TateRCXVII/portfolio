import { registerCommand } from "./registry";

registerCommand("clear", "Clear the terminal", () => {
  return { output: "__CLEAR__" };
});
