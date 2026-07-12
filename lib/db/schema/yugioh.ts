import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { InferModel } from "drizzle-orm";

/* -------------------------------------------------------
   YU‑GI‑OH — SINGLES
------------------------------------------------------- */
export const yugiohSingles = sqliteTable("yugioh_singles", {
  id: integer("id").primaryKey(),

  yugiohId: text("yugioh_id").unique(),
  name: text("name"),

  typeline: text("typeline"),
  type: text("type"),
  humanReadableCardType: text("human_readable_card_type"),
  frameType: text("frame_type"),

  desc: text("desc"),
  race: text("race"),

  atk: integer("atk"),
  def: integer("def"),
  level: integer("level"),

  attribute: text("attribute"),
  archetype: text("archetype"),

  cardSets: text("card_sets"),
  cardImages: text("card_images"),
  cardPrices: text("card_prices"),

  price: real("price").default(0),

  imageSmall: text("image_small"),
  imageLarge: text("image_large"),

  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),


  quantity: integer("quantity").notNull().default(1),
});

export type YugiohSingle = InferModel<typeof yugiohSingles>;
export type NewYugiohSingle = InferModel<typeof yugiohSingles, "insert">;

/* -------------------------------------------------------
   YU‑GI‑OH — SETS
------------------------------------------------------- */
export const yugiohSets = sqliteTable("yugioh_sets", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  setCode: text("set_code").notNull(),
  setName: text("set_name").notNull(),

  releaseDate: text("release_date"),
  totalCards: integer("total_cards"),

  imageUrl: text("image_url"),

  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export type YugiohSet = InferModel<typeof yugiohSets>;
export type NewYugiohSet = InferModel<typeof yugiohSets, "insert">;

/* -------------------------------------------------------
   YU‑GI‑OH — PACKS
------------------------------------------------------- */
export const yugiohPacks = sqliteTable("yugioh_packs", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  setCode: text("set_code").notNull(),
  packName: text("pack_name").notNull(),

  price: real("price").default(0),
  quantity: integer("quantity").notNull().default(1),

  imageUrl: text("image_url"),

  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export type YugiohPack = InferModel<typeof yugiohPacks>;
export type NewYugiohPack = InferModel<typeof yugiohPacks, "insert">;
