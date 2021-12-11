import { Command } from "../../interfaces/Command";
import { ExtendedUser } from "../../interfaces/ExtendedDiscordUser";

export const command: Command = {
  name: "daily",
  aliases: ["dly"],
  run: async (client, message, args) => {
    let user: ExtendedUser = message.author;

    // if(user.lastDailyExectuion)
    // user.lastDailyExectuion = new Date();

    await client.knex
      .select("daily")
      .from("users")
      .where("discord_id", user.id)
      .then((daily) => {
        if (daily.length === 0) {
          return client
            .knex("users")
            .insert([
              {
                daily: user.lastDailyExectuion,
              },
            ])
            .then((newUserId) => {
              console.log("inserted record", user.lastDailyExectuion);
            });
        }
        console.log("not inserted record"), user.lastDailyExectuion;
        return;
      });
  },
};
