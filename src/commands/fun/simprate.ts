import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "simprate",
  aliases: ["sr"],
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;

    var rate =
      (await client.cache.get(user.id)) || Math.floor(Math.random() * 100) + 1;

    await message.reply(`You are ${rate}% simp in the simpverse!`);

    // if (typeof rate === "number") {
    await client.cache.set(user.id, `${rate}`);
    // await client.redisClient.expire(user.id, 600);
    // }
  },
};
