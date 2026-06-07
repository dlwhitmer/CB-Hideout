import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const magicCards = sqliteTable("products", {
  id: integer("id").primaryKey(),
  scryfallId: text("scryfall_id"),
  name: text("name"),
  setCode: text("set_code"),
  setName: text("set_name"),
  manaCost: text("mana_cost"),
  cmc: integer("cmc"),
  colors: text("colors"),
  colorIdentity: text("color_identity"),
  power: text("power"),
  toughness: text("toughness"),
  keywords: text("keywords"),
  typeLine: text("type_line"),
  oracleText: text("oracle_text"),
  layout: text("layout"),
  cardFaces: text("card_faces"),
  collectorNumber: text("collector_number"),
  rarity: text("rarity"),
  price: real("price"),
  imageUrl: text("image_url"),
  artist: text("artist"),
  description: text("description"),
  releasedAt: text("released_at"),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});