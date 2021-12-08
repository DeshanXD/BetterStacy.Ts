import consola, { Consola } from "consola";
import { Config } from "./interfaces/Config";
import { Client, Collection, Intents } from "discord.js";
import { Command } from "./interfaces/Command";
import { Event } from "./interfaces/Event";
import { Schema } from "./interfaces/Schema";
import colors from "colors";
import path from "path";
import { readdirSync } from "fs";
import mongoose from "mongoose";

class BetterStacy extends Client {
  public logger: Consola = consola;
  public config: Config;
  public prefix: string;
  public commands: Collection<string, Command> = new Collection();
  public schemas: Collection<string, Schema> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public events: Collection<string, Event> = new Collection();

  public constructor() {
    // super({ intents: 32767 });
    super({
      intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
      ],
    });
  }

  public async init(config: Config) {
    this.config = config;
    this.prefix = config.prefix;

    this.login(config.token).catch((e) => this.logger.error(e));

    await mongoose
      .connect(`${config.mongoURI}${__dirname}/auth/ca-certificate.crt`, {
        keepAlive: true,
      }) // Make sure your Ip is trusted!
      .then(
        () => console.log(colors.blue("connection established@betterstacy-db")),
        (err) => console.log(colors.red(`connection interrupted @ ${err}`))
      );

    // loading commands
    const commandPath = path.join(__dirname, "commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
        file.endsWith(".ts")
      );
      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        if (command.run) {
          this.commands.set(command.name, command);
          console.log(colors.blue(`Registering Command: ${command.name}`));
          if (command?.aliases.length !== 0) {
            command.aliases.forEach((alias) => {
              this.aliases.set(alias, command);
            });
          }
        } else {
          console.log(colors.red(`Registering failed command: ${file}`));
        }
      }
    });

    // laoding events
    const eventPath = path.join(__dirname, "events");
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`);
      if (event.run) {
        console.log(colors.blue(`Loaded Event: ${event.name}`));
        this.on(event.name, event.run.bind(null, this));
      } else {
        console.log(colors.red(`Loading failed Event: ${file}`));
      }
    });

    // loading Schemas
    const modelsPath = path.join(__dirname, "models");
    readdirSync(modelsPath).forEach(async (dir) => {
      const schemas = readdirSync(`${modelsPath}/${dir}`).filter((file) =>
        file.endsWith(".ts")
      );
      for (const file of schemas) {
        const { sch } = await import(`${modelsPath}/${dir}/${file}`);
        this.schemas.set(sch.name, sch);
      }
    });
  }
}

export { BetterStacy };
