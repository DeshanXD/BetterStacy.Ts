import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "pingsme",
  aliases: ["pme"],
  run: async (client, message, args) => {
    message.channel.send(`${client.ws.ping} ping!`);
  },
};
