import consola, { Consola } from "consola";
import { Config } from "./interfaces/Config";
import { Client } from "discord.js";

class BetterStacy extends Client {
  public logger: Consola = consola;
  public config: Config;
  public prefix: string;

  public constructor() {
    // calling the constructor
    super({ intents: 32767 });
  }

  public async start(config: Config) {
    this.config = config;
    this.prefix = config.prefix;

    // this.registry.registerCommandsIn(path.join(__dirname, "commands"));

    // new WOKCommands(this, {
    //   commandDir: path.join(__dirname, "commands"),
    //   typeScript: true,
    // });

    this.on("ready", () => {
      this.logger.info(
        `${this.user.username} is online on ${this.guilds.cache.size} servers!`
      );
    });

    this.login(config.token).catch((e) => this.logger.error(e));
  }
}

export { BetterStacy };
