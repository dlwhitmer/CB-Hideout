import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";


export const yugioh_products = sqliteTable("yugiohpokemon_products", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  game: text("game"),
  category: text("category"),

  pokemon_id: text("pokemon_id").unique(),

  name: text("name"),

  set_code: text("set_code"),
  set_name: text("set_name"),

  card_number: text("card_number"),

  rarity: text("rarity"),
  supertype: text("supertype"),
  subtypes: text("subtypes"),

  hp: text("hp"),
  types: text("types"),

  artist: text("artist"),

  image_small: text("image_small"),
  image_large: text("image_large"),

  price: real("price"),

  release_date: text("release_date"),

  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});