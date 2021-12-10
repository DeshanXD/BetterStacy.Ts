import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "simprate",
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;

    var rate =
      (await client.redisClient.get(user.id)) ||
      Math.floor(Math.random() * 100) + 1;

    await message.reply(`You are ${rate}% simp in the simpverse!`);

    if (typeof rate === "number") {
      await client.redisClient.set(user.id, `${rate}`);
      await client.redisClient.expire(user.id, 600);
    }
  },
};
