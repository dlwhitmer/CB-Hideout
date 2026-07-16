import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferModel } from "drizzle-orm";

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

  race: text("race"),

  atk: integer("atk"),
  def: integer("def"),
  level: integer("level"),

  attribute: text("attribute"),

  archetype: text("archetype"),

  primarySet: text("primary_set"),
  cardSets: text("card_sets"),
  cardImages: text("card_images"),
  price: integer("price"),
  cardPrices: text("card_prices"),
  setRarity: text("set_rarity"),
  setCode: text("set_code").notNull(),
  marketValue: integer("market_value"),
  imageSmall: text("image_small"),
  imageLarge: text("image_large"),
  quantity: integer("quantity").default(1),

  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
export type YugiohSingle = InferModel<typeof yugiohSingles>;
export type NewYugiohSingle = InferModel<typeof yugiohSingles, "insert">;

// /* -------------------------------------------------------
//    YU‑GI‑OH — SETS
// ------------------------------------------------------- */
// export const yugiohSets = sqliteTable("yugioh_sets", {
//   id: integer("id").primaryKey({ autoIncrement: true }),

//   setCode: text("set_code").notNull(),
//   setName: text("set_name").notNull(),

//   releaseDate: text("release_date"),
//   totalCards: integer("total_cards"),

//   imageUrl: text("image_url"),

//   createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
// });

// export type YugiohSet = InferModel<typeof yugiohSets>;
// export type NewYugiohSet = InferModel<typeof yugiohSets, "insert">;
