import { User } from "discord.js";

export interface ExtendedUser extends User {
  lastDailyExectuion?: Date;
}
