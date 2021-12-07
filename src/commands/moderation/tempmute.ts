import {
  GuildMember,
  Message,
  MessageEmbed,
  MessageReaction,
  ReactionCollector,
  ReactionEmoji,
  User,
} from "discord.js";
import { MembershipStates } from "discord.js/typings/enums";
import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "tempmute",
  aliases: ["tm"],
  run: async (client, message, args) => {
    // working on GuildUserObject
    const guilduserObject: GuildMember = message.mentions.members.first();
    if (!guilduserObject)
      return await message.reply("You need to mention someone to mute!");

    if (!guilduserObject.voice.channel)
      return await message.reply(
        "You can only mute people who are in voice channels!"
      );
    if (guilduserObject.voice.mute)
      return await message.reply("This user has been muted by moderator!");

    const votemuteEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        `${guilduserObject.user.username}`,
        `${guilduserObject.user.avatarURL()}`
      )
      .setDescription(`You are getting vote muted by ${message.author} `);

    const editedVotMuteEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(`${client.user.username}`, `${client.user.avatarURL()}`)
      .setDescription(
        `You got vote muted by !tempmute for 1 minute, Don't leave the voice channel if you do you will get permanently muted`
      );

    try {
      let sendMessage = await message.channel.send({ embeds: [votemuteEmbed] });
      await sendMessage.react("✅");

      await sendMessage
        .awaitReactions({
          filter: (reaction: MessageReaction, user: User) =>
            reaction.emoji.name === "✅",
          time: 15_000,
        })
        .then((collected) => {
          if (collected.size >= 1) {
            guilduserObject.voice.setMute(true);
            console.log(`Muted ${guilduserObject.user.tag}`);
            sendMessage.edit({ embeds: [editedVotMuteEmbed] });

            // unmutes user
            setTimeout(() => {
              if (guilduserObject.voice.channel) {
                guilduserObject.voice.setMute(false);
                console.log(`Unmuted ${guilduserObject.user.tag}`);
              } else {
                console.log(
                  `${guilduserObject.user.tag} got permanently muted`
                );
                message.channel.send(
                  `${guilduserObject.user} You left the voice channel while we tring to unmute you, contact staff to resolve the situation. Thank You!`
                );
              }
            }, 60_000);

            message.delete();
          } else {
            message.reply("You need at least 5 people to vote mute person");
            sendMessage.delete();
          }
        });
    } catch (error) {
      console.log(error);
    }
  },
};
