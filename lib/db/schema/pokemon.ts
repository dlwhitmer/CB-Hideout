import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const pokemonCards = sqliteTable("pokemon_products", {
  id: integer("id").primaryKey(),
  game: text("game").notNull(),
  category: text("category").notNull(),
  pokemonId: text("pokemon_id").notNull().unique(),
  name: text("name").notNull(),
  setCode: text("set_code").notNull(),
  setName: text("set_name").notNull(),
  cardNumber: text("card_number").notNull(),
  rarity: text("rarity").notNull(),
  flavorText: text("flavor_text"),
  supertype: text("supertype").notNull(),
  subtypes: text("subtypes"),
  hp: text("hp"),
  types: text("types"),
  artist: text("artist"),
  quantity: integer("quantity").notNull().default(0),
  imageSmall: text("image_small"),
  imageLarge: text("image_large"),
  price: real("price").notNull(),
  releaseDate: text("release_date"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
