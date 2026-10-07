import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const onePieceCards = sqliteTable("onepiece_cards", {
  id: integer().primaryKey({ autoIncrement: true }),
  inventoryPrice: real("inventory_price").notNull(),
  marketPrice: real("market_price").notNull(),
  cardName: text("card_name").notNull(),
  setName: text("set_name").notNull(),
  cardText: text("card_text").notNull(),
  setId: text("set_id").notNull(),
  rarity: text("rarity").notNull(),
  cardSetId: text("card_set_id").notNull(),
  cardColor: text("card_color").notNull(),
  cardType: text("card_type").notNull(),
  category:text("category"),
  life: integer("life"),
  cardCost: integer("card_cost"),
  cardPower: integer("card_power"),
  subTypes: text("sub_types"),
  counterAmount: integer("counter_amount"),
  attribute: text("attribute"),
  dateScraped: text("date_scraped").notNull(),
  cardImageId: text("card_image_id").notNull(),
  cardImage: text("card_image").notNull(),
});

export type SelectOnePieceCard = InferSelectModel<typeof onePieceCards>;
export type InsertOnePieceCard = InferInsertModel<typeof onePieceCards>;
