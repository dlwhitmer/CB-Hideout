import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { InferModel } from "drizzle-orm";

/* -------------------------------------------------------
   MAGIC — SINGLES (FIXED)
------------------------------------------------------- */
export const magicSingles = sqliteTable("magic_singles", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  scryfall_id: text("scryfall_id").notNull().unique(),
  name: text("name").notNull(),

  set_code: text("set_code").notNull(),
  set_name: text("set_name").notNull(),

  mana_cost: text("mana_cost"),
  cmc: real("cmc"),
  colors: text("colors"),
  color_identity: text("color_identity"),
  power: text("power"),
  toughness: text("toughness"),
  keywords: text("keywords"),
  type_line: text("type_line"),
  oracle_text: text("oracle_text"),
  layout: text("layout"),
  card_faces: text("card_faces"),

  collector_number: text("collector_number").notNull(),
  rarity: text("rarity").notNull(),

  price: real("price"),
  foil_price: real("foil_price"),
  quantity: integer("quantity").default(0),

  // image_uris: text("image_uris"),
  image_small: text("image_small"),
  image_normal: text("image_normal"),

  artist: text("artist"),
  description: text("description"),
  released_at: text("released_at"),

  created_at: text("created_at").default("CURRENT_TIMESTAMP"),
});


export type MagicSingle = InferModel<typeof magicSingles>;
export type NewMagicSingle = InferModel<typeof magicSingles, "insert">;
