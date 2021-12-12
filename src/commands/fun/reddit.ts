import { Command } from "../../interfaces/Command";

import { Message } from "discord.js";
import { Submission } from "snoowrap";

export const command: Command = {
  name: "reddit",
  aliases: ["r", "red"],
  run: async (client, message, args) => {
    if (message.member.guild.id !== "791564680601665537")
      return await message.reply(
        "You can only use this command in RDX Gaming\nhttps://discord.gg/rdxgaming"
      );

    if (message.type !== "REPLY")
      return await message.reply(
        "You need to reply to the image that you are trying to post!"
      );

    if (args[0].toLowerCase() !== "post")
      return await message.reply(
        `You can only use "${client.prefix}reddit post" command which post an image to RDXGaming subreddit!"`
      );

    // get the referenced message
    const imageUrl = await (await message.fetchReference()).attachments.first()
      .url;

    if (!imageUrl)
      return await message.reply("Please use this command on Images!");

    if (imageUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
      client.redditClient
        .getSubreddit("RDXGaming")
        .submitLink({
          subredditName: "RDXGaming",
          url: `${imageUrl}`,
          title: `Submitted by ${message.author.tag}`,
        })
        .then((sub: Submission) => {
          message.reply(`Your post is successfully submitted at ${sub.url}`);
        });
    }
  },
};
