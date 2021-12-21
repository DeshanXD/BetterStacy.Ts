import { Event } from "../interfaces/Event";
import { Command } from "../interfaces/Command";
import { User } from "discord.js";
import { BetterStacy } from "../Bot";

export const event: Event = {
  name: "guildBanRemove",
  run: (clinet: BetterStacy, guildId: string, user: User) => {},
};
