import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const yugiohProducts = sqliteTable("yugioh_products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productType: text("product_type"),
  setCode: text("set_code"),
  setName: text("set_name"),
  productName: text("product_name"),
  releaseDate: text("release_date"),
  cardsPerPack: integer("cards_per_pack"),
  packsPerBox: integer("packs_per_box"),
  ourPrice: real("our_price"),
  marketPrice: real("market_price"),
  imageUrl: text("image_url"),
  description: text("description"),
});

export type YugiohProduct = InferSelectModel<typeof yugiohProducts>;
export type NewYugiohProduct = InferInsertModel<typeof yugiohProducts>;
