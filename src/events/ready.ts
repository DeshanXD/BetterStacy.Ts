import { Event } from "../interfaces/Event";

export const event: Event = {
  name: "ready",
  run: (client) => {
    console.log(
      `${client.user.tag} is online on ${client.guilds.cache.size} servers!`
    );

    client.user.setActivity("!help | betterstacy.me", {
      type: "PLAYING",
    });
  },
};
