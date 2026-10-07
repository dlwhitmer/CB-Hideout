import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const gundamSets = sqliteTable("gundam_sets", {
  id: integer("id").primaryKey(),
  setCode: text("set_code").notNull(),
  setName: text("set_name").notNull(),
  cardCount: integer("card_count").notNull(),
});

export type SelectGundamSet = InferSelectModel<typeof gundamSets>;
export type InsertGundamSet = InferInsertModel<typeof gundamSets>;
