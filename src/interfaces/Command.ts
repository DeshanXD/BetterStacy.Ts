import { BetterStacy } from "../Bot";
import { Message } from "discord.js";

interface Run {
  (clinet: BetterStacy, message: Message, args: string[]);
}

export interface Command {
  name: string;
  description?: string;
  aliases?: string[];
  run: Run;
}
