import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const gundamCards = sqliteTable("gundam_cards", {
  id: integer("id").primaryKey(),
  productID: text("product_id").notNull(),
  cardNumber: text("card_number").notNull(),
  name: text("name").notNull(),
  setCode: text("set_code").notNull(),
  setName: text("set_name").notNull(),
  rarity: text("rarity").notNull(),
  cardType: text("card_type").notNull(),
  color: text("color").notNull(),
  level: text("level"),
  cost: text("cost"),
  ap: text("ap"),
  hp: text("hp"),
  zone: text("zone").notNull(),
  trait: text("trait").notNull(),
  traits: text("traits", { mode: "json" }).notNull(),
  effect: text("effect").notNull(),
  keywordEffects: text("keyword_effects", { mode: "json" }).notNull(),
  linkRefs: text("link_refs", { mode: "json" }).notNull(),
  imageUrl: text("image_url").notNull(),
});

export type SelectGundamCard = InferSelectModel<typeof gundamCards>;
export type InsertGundamCard = InferInsertModel<typeof gundamCards>;
