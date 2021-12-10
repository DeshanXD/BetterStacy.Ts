// import { Command } from "../../interfaces/Command";
// import  {MessageEmbed}  from "discord.js";
// import moment from "moment";
// import { Presence } from "discord.js";

// export const command: Command = {
//   name: "userinfo",
//   aliases: ["ui"],
//   run: async (bot, message, args) => {
//     let user = message.mentions.users.first() || message.author;
//     const joinDiscord = moment(user.createdAt).format("llll");
//     const joinServer = moment(user.createdTimestamp).format("llll");
//     let embed = new MessageEmbed()
//       .setAuthor(
//         user.username + "#" + user.discriminator,
//         user.defaultAvatarURL
//       )
//       .setDescription(`${user}`)
//       .setColor(`RANDOM`)
//       .setThumbnail(`${user.displayAvatarURL}`)
//       .addField(
//         "Joined at:",
//         `${moment.utc(user.createdTimestamp).format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
//         true
//       )
//       .addField("Status:", user., true)
//       .addField("Roles:", user.roles.map((r) => `${r}`).join(" | "), true)
//       .setFooter(`ID: ${user.id}`)
//       .setTimestamp();

//     message.channel.send({ embeds: [embed] });
//     return;
//   },
// };
