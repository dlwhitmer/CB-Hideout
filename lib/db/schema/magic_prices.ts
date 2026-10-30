import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const magicPrices = sqliteTable("magic_prices", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  scryfallId: text("scryfall_id").notNull().unique(),

  usd: real("usd"),
  usdFoil: real("usd_foil"),
  usdEtched: real("usd_etched"),
  eur: real("eur"),
  eurFoil: real("eur_foil"),
  tix: real("tix"),
  ourPrice: real("our_price"),
  ourFoil: real("our_foil"),
  ourEtched:real("our_etched"),

  fetchedAt: integer("fetched_at").notNull(),
});

export type SelectMagicPrice = InferSelectModel<typeof magicPrices>;
export type InsertMagicPrice = InferInsertModel<typeof magicPrices>;
