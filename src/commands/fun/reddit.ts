import { Channel, TextChannel } from "discord.js";
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
    const resourceURL = await (
      await message.fetchReference()
    ).attachments.first().url;

    if (!resourceURL)
      return await message.reply("Please use this command on Images!");

    if (client.cache.get(`${resourceURL}`))
      return await message.reply("This image has been already submitted!");

    if (resourceURL.match(/\.(jpeg|jpg|gif|png|mp4|flv)$/)) {
      try {
        const post_id = await client.redditClient
          .getSubreddit("RDXGaming")
          .submitLink({
            subredditName: "RDXGaming",
            url: `${resourceURL}`,
            title: `${title} by ${message.author.tag}`,
          })
          .then((sub) => {
            return sub.id;
          });

        message.reply(
          `Your post: ${post_id} is successfully submitted at RDX Gaming Reddit!`
        );

        // try to approve the submited post
        await new Promise((resolve) =>
          client.redditClient.getSubmission(post_id).approve().then(resolve)
        );

        const mod_commands = await client.channels.fetch("889063871661342731");

        // console.log(mod_commands); // DEBUG

        await (mod_commands as TextChannel).send(
          `Post id: ${post_id} is submitted to reddit! <@&920542640179650591> can approve it by \`\`\`!ra [post-id]\`\`\``
        );

        // set post id to cache
        client.cache.set(`${resourceURL}`, `${post_id}`, 9000);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
