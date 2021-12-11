import { Knex } from "knex";

export const knexConfig: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3",
  },
};
