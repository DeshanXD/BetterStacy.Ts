import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "simprate",
  aliases: ["sr"],
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;

    var rate =
      (await client.cache.get(user.id)) || Math.floor(Math.random() * 100) + 1;

    await message.reply(`You are ${rate}% simp in the simpverse!`);

    // await client.knex
    //   .select("discord_id")
    //   .from("users")
    //   .where("discord_id", user.id)
    //   .then((userNametList) => {
    //     if (userNametList.length === 0) {
    //       return client
    //         .knex("users")
    //         .insert([
    //           {
    //             discord_id: user.id,
    //             coins: rate,
    //           },
    //         ])
    //         .then((newUserId) => {
    //           console.log("inserted user", newUserId);
    //         });
    //     }
    //     console.log("not inserting user");
    //     return;
    //   });

    // await client.knex("users").insert({ discord_id: user.id, coins: rate });

    // if (typeof rate === "number") {
    await client.cache.set(user.id, `${rate}`);
    // await client.redisClient.expire(user.id, 600);
    // }
  },
};
