import {
  GuildMember,
  Message,
  MessageEmbed,
  MessageReaction,
  User,
} from "discord.js";
import { config } from "dotenv";
import { Command } from "../../interfaces/Command";

export const command: Command = {
  name: "votekick",
  aliases: ["vk"],
  run: async (client, message, args) => {
    const guildUser: GuildMember = message.mentions.members.first();
    const kickPeriod = 60_000; // User can't join until the time is passed

    if (!guildUser) returnFunc(message);
    if (!guildUser.voice.channel) returnFunc(message);
    if (client.cache.get(`vk${guildUser.id}`)) returnFunc(message);

    try {
      await message.channel
        .send({ embeds: [kickUserEmbed(guildUser)] })
        .then((m) => {
          m.react("✅");
          m.awaitReactions({
            filter: (r: MessageReaction, user: User) =>
              r.emoji.name === "✅" && ifLiveOnVoiceChannel(guildUser, user),
            time: 25_000,
          }).then((collected) => {
            if (collected.size >= 5) {
              guildUser.voice.disconnect("User has been votekicked!");
              client.cache.set(`vk${guildUser.id}`, true, kickPeriod);
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  },
};

function returnFunc(m: Message): void {
  m.delete();
  return;
}

function kickUserEmbed(m: GuildMember): MessageEmbed {
  return new MessageEmbed()
    .setAuthor(`${m.user.tag}`, `${m.user.avatarURL()}`)
    .setDescription(
      `You can kick this person by reacting to ✅${m.voice.channel.members.forEach(
        (member) => member.user
      )}`
    );
}

// return true if reacted user is in the channel
function ifLiveOnVoiceChannel(
  kickUser: GuildMember,
  user: User
): boolean | Promise<boolean> {
  return !!kickUser.voice.channel.members.find(
    (member) => member.user === user
  );
}
