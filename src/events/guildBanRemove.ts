import { Event } from "../interfaces/Event";
import { Command } from "../interfaces/Command";
import { TextChannel, User } from "discord.js";
import { BetterStacy } from "../Bot";

export const event: Event = {
  name: "guildBanRemove",
  run: async (client: BetterStacy, guildId: string, user: User) => {
    let channel = client.guilds.cache
      .get(guildId)
      .channels.cache.find(
        (channel) => channel.name === "general"
      ) as TextChannel;
    if (!!channel) {
      let invite = await channel.createInvite({
        maxUses: 1,
      });

      try {
        user.send(
          invite.url +
            "\nYou have been unbanned from this server you can join now!"
        );
      } catch (error) {
        console.log(error);
      }
    }
  },
};
