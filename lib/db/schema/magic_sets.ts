import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const magicSets = sqliteTable("magic_sets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  setName: text("set_name"),
  setCode: text("set_code"),
  setType: text("set_type"),
  releasedAt: text("released_at"),
  totalCards: integer("total_cards"),
});

export type MagicSet = InferSelectModel<typeof magicSets>;
export type NewMagicSet = InferInsertModel<typeof magicSets>;
