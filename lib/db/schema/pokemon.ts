import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const pokemonCards = sqliteTable("pokemon_products", {
  id: integer("id").primaryKey(),
  game: text("game"),
  category: text("category"),
  pokemonId: text("pokemon_id"),
  name: text("name"),
  setCode: text("set_code"),
  setName: text("set_name"),
  cardNumber: text("card_number"),
  rarity: text("rarity"),
  flavorText: text("flavor_text"),
  supertype: text("supertype"),
  subtypes: text("subtypes"),
  hp: text("hp"),
  types: text("types"),
  artist: text("artist"),
  imageSmall: text("image_small"),
  imageLarge: text("image_large"),
  price: real("price"),
  releaseDate: text("release_date"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
