import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const onePieceSingles = sqliteTable("onepiece_singles", {
  id: integer("id").primaryKey(),
  inventoryPrice: real("inventory_price"),
  marketPrice: real("market_price"),
  cardName: text("card_name"),
  setName: text("set_name"),
  cardText: text("card_text"),
  setId: text("set_id"),
  rarity: text("rarity"),
  cardSingleId: text("card_set_id"),
  cardColor: text("card_color"),
  cardType: text("card_type"),
  life: integer("life"),
  cardCost: integer("card_cost"),
  cardPower: integer("card_power"),
  subTypes: text("sub_types"),
  counterAmount: integer("counter_amount"),
  attribute:integer("attribute"),
  dateScraped: text("date_scraped"),
  cardImageId: text("card_image_id"),
  cardImage: text("card_image"),
});

export type SelectOnePieceSingle = InferSelectModel<typeof onePieceSingles>;
export type InsertOnePieceSingle = InferInsertModel<typeof onePieceSingles>;
