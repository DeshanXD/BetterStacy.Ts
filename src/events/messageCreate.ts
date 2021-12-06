import { Message } from "discord.js";
import { Command, execute } from "../interfaces/Command";
import { RunFunction } from "../interfaces/Event";

export const run = async (client, message: Message) => {
  const prefix = client.prefix;

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);

  if (command) command.exec(client, command, message);
};

export const name: string = "messageCreate";
