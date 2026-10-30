import {sqliteTable, text, real, integer} from "drizzle-orm/sqlite-core";

import {
  InferSelectModel, InferInsertModel} from "drizzle-orm";

export const riftBoundPrices = sqliteTable("riftbound_prices", {
  id: integer().primaryKey({ autoIncrement: true }),

  riftboundId: text("riftbound_id").notNull().unique(),

  collector: text("collector"),
  slug: text("slug"),
  tcgId: text("tcg_id"),
  purchaseUri: text("purchase_uri"),

  finishes: text("finishes", { mode: "json" }).$type<{
    foil: {
      low: number | null;
      mid: number | null;
      high: number | null;
      market: number | null;
      directLow: number | null;
    };
    normal: {
      low: number | null;
      mid: number | null;
      high: number | null;
      market: number | null;
      directLow: number | null;
    };
  }>(),

  ourFoilPrice: real("our_foil_price"),
  ourPrice: real("our_price"),

  lastUpdated: text("last_updated"),
});

export type SelectRiftBoundPrice = InferSelectModel<typeof riftBoundPrices>;
export type InsertRiftBoundPrice = InferInsertModel<typeof riftBoundPrices>;