import { BetterStacy } from "./Bot";
import dotenv from "dotenv";
dotenv.config();

new BetterStacy().start({
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
});
