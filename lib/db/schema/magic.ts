import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const magicCards = sqliteTable("products", {
  id: integer("id").primaryKey(),

  // Required identifiers
  scryfallId: text("scryfall_id").notNull().unique(),
  name: text("name").notNull(),
  setCode: text("set_code").notNull(),
  setName: text("set_name").notNull(),
  collectorNumber: text("collector_number").notNull(),

  // Gameplay fields (always present in Scryfall)
  typeLine: text("type_line").notNull(),
  rarity: text("rarity").notNull(),
  layout: text("layout").notNull(),

  // Optional gameplay fields
  manaCost: text("mana_cost"),
  cmc: integer("cmc"),
  colors: text("colors"),
  colorIdentity: text("color_identity"),
  power: text("power"),
  toughness: text("toughness"),
  keywords: text("keywords"),
  oracleText: text("oracle_text"),
  cardFaces: text("card_faces"),

  // Inventory + pricing
  price: real("price").notNull(),
  quantity: integer("quantity").notNull().default(0),

  // Optional metadata
  imageUrl: text("image_url"),
  artist: text("artist"),
  description: text("description"),
  releasedAt: text("released_at"),

  // Auto timestamp
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
