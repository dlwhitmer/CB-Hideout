import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const yugiohSets = sqliteTable("yugioh_sets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  setName: text("set_name"),
  setCode: text("set_code"),
  setType: text("set_type"),
  releaseDate: text("release_date"),
  totalCards: integer("total_cards"),
});

export type YugiohSet = InferSelectModel<typeof yugiohSets>;
export type NewYugiohSet = InferInsertModel<typeof yugiohSets>;
