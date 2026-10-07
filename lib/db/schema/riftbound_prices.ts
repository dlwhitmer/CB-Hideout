import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const riftBoundPrices = sqliteTable("riftbound_prices", {
  id: integer().primaryKey({ autoIncrement: true }),
  riftboundId:text("riftbound_id"),
  apiId: integer("api_id").notNull(),
  name: text("name").notNull(),
  rarity: text("rarity"),
  expansion: text("expansion").notNull(),
  artist: text("artist").notNull(),
  image: text("image").notNull(),
  tcggoUrl: text("tcggo_url").notNull(),
  prices: text("prices"),
  gradedPrices: text("graded_prices"),
  lastUpdated: text("last_updated"),
});

export type SelectRiftBoundPrice = InferSelectModel<typeof riftBoundPrices>;
export type InsertRiftBoundPrice = InferInsertModel<typeof riftBoundPrices>;
