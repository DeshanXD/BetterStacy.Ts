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
            title: `Submitted by ${message.author.tag}`,
          })
          .then((sub) => {
            message.reply(
              `Your post is successfully submitted at RDX Gaming Reddit!\nhttps://www.reddit.com/comments/${sub.name}/`
            );

            return sub.id;
          });

        // Approve the submited post
        client.redditClient.getSubmission(post_id).approve();

        if (client.redditClient.getSubmission(post_id).spam)
          message.channel.send(
            "Post need moderation it was spammed! in the reddit"
          );

        client.cache.set(`${imageUrl}`, "uploaded", 9000);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
