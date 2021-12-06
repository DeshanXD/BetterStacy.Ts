import { RunFunction } from "../interfaces/Event";

export const name: string = "ready";
export const run: RunFunction = async (client) => {
  client.logger.success(
    `${client.user.username} is online on ${client.guilds.cache.size} servers!`
  );
  // const commands = [...client.commands.values()];
  // client.application.commands.set(commands)
};
