import { execute } from "../interfaces/Command";
import fetch from "node-fetch";
import { Message } from "discord.js";

export const exec = async (client, command, message) => {
  // console.log(command.exec);
  // command.exec();
  await message.reply("Ping");
};

export const name: string = "ping";
export const category: string = "fun";
export const description: string = "Get a random fact you didn't need to know.";
// export const options: import("discord.js").ApplicationCommandOption[] = [];
