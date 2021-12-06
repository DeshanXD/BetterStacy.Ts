export const exec = async (client, command, message) => {
  await message.reply("Pong");
};

export const name: string = "ping";
export const category: string = "fun";
export const description: string = "Application test command";
// export const options: import("discord.js").ApplicationCommandOption[] = [];
