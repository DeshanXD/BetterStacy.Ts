import { Command } from "../../interfaces/Command";
import { MessageActionRow, Permissions } from "discord.js";

export const command: Command = {
  name: "redditapprove",
  aliases: ["rapprove", "ra"],
  run: async (client, message, args) => {
    if (message.member.guild.id !== "791564680601665537")
      return await message.reply("You have to run this command in RDX Guild!");

    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      await message.channel.send(
        "You need admin permisson to run this command!"
      );

    if (!args[0]) await message.channel.send("You need specify the reddit id");

    const redditId: string = args[0];

    client.redditClient
      .getSubmission(redditId)
      .approve()
      .then((value) => console.log("Approval promise succeed!"))
      .catch((err) => console.log(err));
  },
};
