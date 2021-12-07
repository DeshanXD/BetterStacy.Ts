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

    const votemuteEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        `${guilduserObject.user.username}`,
        `${guilduserObject.user.avatarURL()}`
      )
      .setDescription(
        `You are getting vote muted by people on channel | ${message.member.voice.channel.name} | initiated by ${message.author} `
      );

    const editedVotMuteEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        `${guilduserObject.user.username}`,
        `${guilduserObject.user.avatarURL()}`
      )
      .setDescription(
        `You got vote muted by ${message.member.voice.channel.name} chat using !tempmute`
      );

    try {
      if (!message.mentions.members.first())
        return await message.reply("You need to mention someone to mute!");

      let sendMessage = await message.channel.send({ embeds: [votemuteEmbed] });
      // let reactionFilter = (reaction: MessageReaction, user: User) => reaction.emoji.name === '✅'
      await sendMessage.react("✅");

      await sendMessage.awaitReactions({
        filter: (reaction: MessageReaction, user: User) =>
          reaction.emoji.name === "✅",
        time: 10_000,
      }).then(collected => if(collected.size >= 5 ) );
    } catch (error) {
      console.log(error);
    }
  },
};

function userMute(member: GuildMember) {}
