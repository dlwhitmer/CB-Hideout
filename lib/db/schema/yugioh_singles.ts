import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

/* -------------------------------------------------------
    YU‑GI‑OH — SINGLES
  ------------------------------------------------------- */
export const yugiohSingles = sqliteTable("yugioh_singles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  yugiohId: text("yugioh_id").notNull(),
  name: text("name").notNull(),
  typeline: text("typeline"),
  type: text("type"),
  humanReadableCardType: text("human_readable_card_type"),
  frameType: text("frame_type"),
  desc: text("desc"),
  linkmarkers: text("linkmarkers"),
  linkval: integer("linkval"),
  race: text("race"),
  atk: integer("atk"),
  def: integer("def"),
  level: integer("level"),
  scale:integer("scale"),
  attribute: text("attribute"),
  archetype: text("archetype"),
  primarySet: text("primary_set"),
  cardSets: text("card_sets"),
  cardImages: text("card_images"),
  price: real("price"),
  cardPrices: text("card_prices"),
  imageSmall: text("image_small"),
  imageLarge: text("image_large"),
  quantity: integer("quantity").default(1),

  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
export type YugiohSingle = InferSelectModel<typeof yugiohSingles>;
export type NewYugiohSingle = InferInsertModel<typeof yugiohSingles>;

// Printing-level mapper

export const yugiohPrintings = sqliteTable("yugioh_printings", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  yugiohId: text("yugioh_id").notNull(),
  setCode: text("set_code").notNull(),
  setName: text("set_name").notNull(),
  setRarity: text("set_rarity"),
  marketValue: real("market_value"),
});
export type YugiohPrinting = InferSelectModel<typeof yugiohPrintings>;
export type NewYugiohPrinting = InferInsertModel<typeof yugiohPrintings>;



