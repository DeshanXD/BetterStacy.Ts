import { BetterStacy } from "./Bot";
import dotenv from "dotenv";
dotenv.config();

new BetterStacy().init({
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  mongoURI: process.env.MongoURI,
});
