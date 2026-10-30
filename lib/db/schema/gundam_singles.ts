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
  color: text("color").notNull(),
  level: text("level").notNull(),
  cost: text("cost").notNull(),
  ap: text("ap").notNull(),
  hp: text("hp").notNull(),
  zone: text("zone").notNull(),
  link:text("link"),
  linkRefs: text("link_refs", { mode: "json" }).notNull(),
  trait: text("trait").notNull(),
  traits: text("traits", { mode: "json" }).notNull(),
  effect: text("effect").notNull(),
  keywordEffects: text("keyword_effects", { mode: "json" }).notNull(),
  imageUrl: text("image_url").notNull(),
  condition: text("condition"),
  quantity: integer("quantity").default(0),
  ourPrice: integer("our_price").notNull(),
});

export type SelectGundamSingle = InferSelectModel<typeof gundamSingles>;
export type InsertGundamSingle = InferInsertModel<typeof gundamSingles>;
