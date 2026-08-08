import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { InferModel } from "drizzle-orm";

export const magicSingles = sqliteTable("magic_singles", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Card identity
  scryfallId: text("scryfall_id").notNull().unique(),
  oracleId: text("oracle_id"),

  // Set info
  setCode: text("set_code").notNull(),
  setName: text("set_name").notNull(),
  setType: text("set_type"),

  // Card-wide info
  finishes: text("finishes"),
  digital: integer("digital", { mode: "boolean" }),
  cmc: real("cmc"),
  colorIdentity: text("color_identity"),
  keywords: text("keywords"),
  layout: text("layout"),

  // Raw Scryfall backup
  card_faces: text("card_faces"),
  lang:text("lang"),
  

  // Front face
  name: text("name"),
  frontName: text("front_name"),
  frontManaCost: text("front_mana_cost"),
  frontTypeLine: text("front_type_line"),
  frontOracleText: text("front_oracle_text"),
  frontColors: text("front_colors"),
  frontPower: text("front_power"),
  frontToughness: text("front_toughness"),
  frontLoyalty: integer("front_loyalty"),
  frontDefense: integer("front_defense"),

  // Back face
  backName: text("back_name"),
  backManaCost: text("back_mana_cost"),
  backTypeLine: text("back_type_line"),
  backOracleText: text("back_oracle_text"),
  backColors: text("back_colors"),
  backPower: text("back_power"),
  backToughness: text("back_toughness"),
  backLoyalty: integer("back_loyalty"),
  backDefense: integer("back_defense"),

  // Images
  frontImageSmall: text("front_image_small"),
  frontImageNormal: text("front_image_normal"),

  backImageSmall: text("back_image_small"),
  backImageNormal: text("back_image_normal"),

  // Existing image fields (keep these)
  imageSmall: text("image_small"),
  imageNormal: text("image_normal"),

  // Store info
  collectorNumber: text("collector_number"),
  rarity: text("rarity"),

  price: real("price"),
  foilPrice: real("foil_price"),

  quantity: integer("quantity").default(0), 

  cardCount: integer("card_count"),

  artist: text("artist"),

  releasedAt: text("released_at"),
  updatedAt: text("updated_at"),
  createdAt: text("created_at"),
});

export type MagicSingle = InferModel<typeof magicSingles>;
export type NewMagicSingle = InferModel<typeof magicSingles, "insert">;