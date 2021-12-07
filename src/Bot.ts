import consola, { Consola } from "consola";
import { Config } from "./interfaces/Config";
import { Client, Collection, Intents } from "discord.js";
import { Command } from "./interfaces/Command";
import { Event } from "./interfaces/Event";
import path from "path";
import { readdirSync } from "fs";

class BetterStacy extends Client {
  public logger: Consola = consola;
  public config: Config;
  public prefix: string;
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public events: Collection<string, Event> = new Collection();

  public constructor() {
    // super({ intents: 32767 });
    super({
      intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILDS,
      ],
    });
  }

  public async init(config: Config) {
    this.config = config;
    this.prefix = config.prefix;

    this.login(config.token).catch((e) => this.logger.error(e));

    const commandPath = path.join(__dirname, "src", "commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
        file.endsWith(".ts")
      );

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        this.commands.set(command.name, command);

        if (command?.alias.length !== 0) {
          command.aliases.forEach((alias) => {
            this.aliases.set(alias, command);
          });
        }
      }

      const eventPath = path.join(__dirname, "src", "events");
      readdirSync(eventPath).forEach(async (file) => {
        const { event } = await import(`${eventPath}/${file}`);
        this.on(event.name, event.run.bind(null, this));
      });
    });
  }
}

export { BetterStacy };
