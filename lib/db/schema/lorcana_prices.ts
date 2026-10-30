import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const lorcanaPrices = sqliteTable("lorcana_prices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  cardId: integer("card_id").notNull().unique(),
  lowestNearMint: real("lowest_near_mint"),
  currency: text("currency").notNull().default("EUR"),
  fetchedAt: integer("fetched_at"),
});

export type SelectLorcanaPrice = InferSelectModel<typeof lorcanaPrices>;
export type InsertLorcanaPrice = InferInsertModel<typeof lorcanaPrices>;