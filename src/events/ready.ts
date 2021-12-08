import { Event } from "../interfaces/Event";
import colors from "colors";

export const event: Event = {
  name: "ready",
  run: (client) => {
    console.log(
      colors.green.underline(
        `${client.user.tag} is online on ${client.guilds.cache.size} servers!`
      )
    );
  },
};
