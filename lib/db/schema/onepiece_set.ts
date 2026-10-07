import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const onePieceSets = sqliteTable("onepiece_sets", {
  id: integer("id").primaryKey(),
  setName: text("set_name"),
  setId: text("set_id"),
});

export type SelectOnePieceSet = InferSelectModel<typeof onePieceSets>;
export type InsertOnePieceSet = InferInsertModel<typeof onePieceSets>;