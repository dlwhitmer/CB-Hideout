import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const gundamSingles = sqliteTable("gundam_singles", {
  id: integer("id").primaryKey(),
  productId: text("product_id").notNull().unique(),
  cardNumber: text("card_number").notNull(),
  name: text("name").notNull(),
  setCode: text("set_code").notNull(),
  setName: text("set_name").notNull(),
  rarity: text("rarity").notNull(),
  cardType: text("card_type").notNull(),
  colors: text("colors").notNull(),
  level: text("level").notNull(),
  cost: text("cost").notNull(),
  ap: text("ap").notNull(),
  hp: text("hp").notNull(),
  zone: text("zone").notNull(),
  linkRefs: text("link_refs", { mode: "json" }).notNull(),
  trait: text("trait").notNull(),
  traits: text("traits", { mode: "json" }).notNull(),
  effect: text("effect").notNull(),
  keyboardEffects: text("keyboard_effects", { mode: "json" }).notNull(),
  imageUrl: text("image_url").notNull(),
  detailImageUrl: text("detail_image_url").notNull(),

  price: integer("price").notNull(),
});

export type SelectGundamSingle = InferSelectModel<typeof gundamSingles>;
export type InsertGundamSingle = InferInsertModel<typeof gundamSingles>;
