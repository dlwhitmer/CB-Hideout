import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const riftboundSets = sqliteTable("riftbound_sets", {
  id: integer("id").primaryKey(),
  name: text("name"),
  apiId: text("api_id"),
  code: text("code"),
  cardCount: integer("card_count"),
  releaseDate: text("release_date")
});

export type SelectRiftboundSet = InferSelectModel<typeof riftboundSets>;
export type InsertRiftboundSet = InferInsertModel<typeof riftboundSets>;