import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("discord_id");
    table.integer("coins");
    table.integer("daily");
    table.integer("earned");
    table.integer("invites");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
