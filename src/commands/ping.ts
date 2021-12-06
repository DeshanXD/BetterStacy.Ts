import { ICommand } from "wokcommands";

export default {
  category: "Testing",
  description: "Replies with pong",

  callback: ({ message }) => {
    message.reply("Pong");
  },
};
