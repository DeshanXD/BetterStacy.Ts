import { TextChannel } from "discord.js";
import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "reddit",
  aliases: ["r", "red"],
  run: async (client, message, args) => {
    // if (message.member.guild.id !== "791564680601665537")
    //   return await message.reply(
    //     "You can only use this command in RDX Gaming\nhttps://discord.gg/rdxgaming"
    //   );

    if (message.type !== "REPLY")
      return await message.reply(
        "You need to reply to the image that you are trying to post!"
      );

    if (args[0].toLowerCase() !== "post")
      return await message.reply(
        `You can only use "${client.prefix}reddit post" command which post an image to RDXGaming subreddit!"`
      );

    if (!args[1])
      return await message.reply(
        'You need to add title run the command ```!reddit post "title"\'```'
      );

    const title: string = args.slice(1).join(" ");

    // get the referenced message
    const imageUrl = await (await message.fetchReference()).attachments.first()
      .url;

    if (!imageUrl)
      return await message.reply("Please use this command on Images!");

    if (client.cache.get(`${imageUrl}`))
      return await message.reply("This image has been already submitted!");

    if (imageUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
      try {
        const post_id = await client.redditClient
          .getSubreddit("RDXGaming")
          .submitLink({
            subredditName: "RDXGaming",
            url: `${imageUrl}`,
            title: `${title} by ${message.author.tag}`,
          })
          .then((sub) => {
            message.reply(
              `Your post is successfully submitted at RDX Gaming Reddit!`
            );

            return sub.id;
          });

        // try to approve the submited post
        await new Promise((resolve) =>
          client.redditClient.getSubmission(post_id).approve().then(resolve)
        );

        // notifying mod channel
        const mod_commands = client.channels.cache.get(
          "889063871661342731"
        ) as TextChannel;
        await mod_commands.send(
          `Post id: ${post_id} is submitted to reddit! you can approve it by !ra [post-id]`
        );

        // set post id to cache
        client.cache.set(`${imageUrl}`, `${post_id}`, 9000);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
