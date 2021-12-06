import {
  CommandInteraction,
  PermissionResolvable,
  ApplicationCommandOption,
  Message,
} from "discord.js";
import { BetterStacy } from "../Bot";

export interface RunFunction {
  // Make this CommandInteration
  (client: BetterStacy, interaction: CommandInteraction): Promise<unknown>;
}

export interface execute {
  (client: BetterStacy, command: Command, message: Message): Promise<unknown>;
}
export interface Command {
  name: string;
  run: RunFunction;
  exec: execute;
  description: string;
  cooldown?: number;
  category: string;
  userPermissions?: PermissionResolvable | PermissionResolvable[];
  ownerOnly?: boolean;
  usage?: string;
  options?: ApplicationCommandOption[];
}
