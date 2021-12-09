import { Config } from "./interfaces/Config";
import { Client, Collection, Intents } from "discord.js";
import { Command } from "./interfaces/Command";
import { Event } from "./interfaces/Event";
import { Schema } from "./interfaces/Schema";
import path from "path";
import { readdirSync } from "fs";
import mongoose from "mongoose";

class BetterStacy extends Client {
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

    // this.on("debug", console.log).on("warn", console.log);
    await mongoose
      .connect(`${config.mongoURI}${__dirname}/../ca-certificate.crt`, {
        keepAlive: true,
      }) // Make sure your Ip is trusted!
      .then(
        () =>
          console.log(
            `Databse connection established with mongoose: ${mongoose.version}`
          ),
        (err) => console.log(`connection interrupted @ ${err}`)
      );

    // laoding events
    const eventPath = path.join(__dirname, "events");
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = require(`${eventPath}/${file}`);
      if (event.run) {
        console.log(`Loaded Event: ${event.name}`);
        this.on(event.name, event.run.bind(null, this));
      } else {
        console.log(`Loading failed Event: ${file}`);
      }
    });

    // loading commands
    const commandPath = path.join(__dirname, "commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter(
        (file) => file.endsWith(".js") || file.endsWith(".ts")
      );
      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        if (command.run) {
          this.commands.set(command.name, command);
          console.log(`Registering Command: ${command.name}`);
          if (command?.aliases.length !== 0) {
            command.aliases.forEach((alias) => {
              this.aliases.set(alias, command);
            });
          }
        } else {
          console.log(`Registering failed command: ${file}`);
        }
      }
    });

    // loading Schemas
    const modelsPath = path.join(__dirname, "models");
    readdirSync(modelsPath).forEach((dir) => {
      const schema_f = readdirSync(`${modelsPath}/${dir}`).filter(
        (file) => file.endsWith(".js") || file.endsWith(".ts")
      );

      for (const file of schema_f) {
        const sch = require(`${modelsPath}/${dir}/${file}`);
        if (sch.data) {
          this.schemas.set(sch.name, sch);
          console.log(`Loaded DataModel: ${sch.name}`);
        } else {
          console.log(`Loading DataModel failed: ${file}`);
        }
      }
    });
    await this.login(config.token).catch((e) => console.error(e));
  }
}

export { BetterStacy };
