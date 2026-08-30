import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const magicCards = sqliteTable("magic_cards", {
  id: integer().primaryKey({ autoIncrement: true }),

  // Card identity
  scryfallId: text("scryfall_id").notNull().unique(),
  oracleId: text("oracle_id"),

  // Set info
  setCode: text("set_code").notNull(),
  setName: text("set_name").notNull(),
  setType: text("set_type").notNull(),

  // Card-wide info
  finishes: text("finishes").notNull(),
  digital: integer("digital").notNull(),

  cmc: integer("cmc"),

  colorIdentity: text("color_identity").notNull(),
  keywords: text("keywords").notNull(),
  layout: text("layout").notNull(),

  // Raw Scryfall backup
  card_faces: text("card_faces"),
  lang: text("lang"),

  // Front face
  name: text("name").notNull(),
  frontName: text("front_name"),
  frontManaCost: text("front_mana_cost"),
  frontTypeLine: text("front_type_line"),
  frontOracleText: text("front_oracle_text"),
  frontColors: text("front_colors"),
  frontPower: integer("front_power"),
  frontToughness: integer("front_toughness"),
  frontLoyalty: integer("front_loyalty"),
  frontDefense: integer("front_defense"),

  // Back face
  backName: text("back_name"),
  backManaCost: text("back_mana_cost"),
  backTypeLine: text("back_type_line"),
  backOracleText: text("back_oracle_text"),
  backColors: text("back_colors"),
  backPower: integer("back_power"),
  backToughness: integer("back_toughness"),
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

  totalCards: integer("total_cards"),
  artist: text("artist").notNull(),

  releasedAt: text("released_at"),
  createdAt: text("created_at").notNull().default(`CURRENT_TIMESTAMP`),
});

export type MagicCard = InferSelectModel<typeof magicCards>;
export type NewMagicCard = InferInsertModel<typeof magicCards>;
