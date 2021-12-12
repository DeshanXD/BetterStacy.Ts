import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "reddit",
  aliases: ["r", "red"],
  run: async (client, message, args) => {
    console.log(args);
    console.log(args[0]);

    if (message.type !== "REPLY")
      return await message.reply(
        "You need to reply to the image that you are trying to post!"
      );

    if (args[0].toLowerCase() !== "post")
      return await message.reply(
        `You can only udiscord_id "${client.prefix}reddit post" command which post an image to RDXGaming subreddit!"`
      );

    await message.channel.send(
      `This command is still under development. Please try again later!`
    );
  },
};
