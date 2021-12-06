import consola, { Consola } from "consola";
import { Config } from "./interfaces/Config";
import { Client, Collection, Intents } from "discord.js";
import { Command } from "./interfaces/Command";
import { Event } from "./interfaces/Event";

import EventEmitter from "events";
import glob from "glob";
import { promisify } from "util";

const globPromise = promisify(glob);

class BetterStacy extends Client {
  public logger: Consola = consola;
  public config: Config;
  public prefix: string;
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public cooldowns: Collection<string, number> = new Collection();
  public categories: Set<string> = new Set();

  public constructor() {
    // calling the constructor
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

  public async start(config: Config) {
    this.config = config;
    this.prefix = config.prefix;

    this.login(config.token).catch((e) => this.logger.error(e));

    const commandFiles: string[] = await globPromise(
      `${__dirname}/commands/*{.js,.ts}`
    );
    const eventFiles: string[] = await globPromise(
      `${__dirname}/events/*{.js,.ts}`
    );

    commandFiles.map(async (cmdFile: string) => {
      const cmd = (await import(cmdFile)) as Command;
      this.commands.set(cmd.name, { cooldown: 3000, ...cmd });
      this.categories.add(cmd.category);
    });

    eventFiles.map(async (eventFile: string) => {
      const event = (await import(eventFile)) as Event;
      if (event.emitter && typeof event.emitter == "function") {
        event.emitter(this).on(event.name, event.run.bind(null, this));
      } else if (event.emitter && event.emitter instanceof EventEmitter) {
        (event.emitter as EventEmitter).on(
          event.name,
          event.run.bind(null, this)
        );
      } else {
        this.on(event.name, event.run.bind(null, this));
      }
    });
  }
}

export { BetterStacy };
