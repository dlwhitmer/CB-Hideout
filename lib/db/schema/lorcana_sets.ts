import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const lorcanaSets = sqliteTable("lorcana_sets", {
  id: integer("id").primaryKey(),
  SetNum: integer("Set_Num").notNull(),
  ReleaseDate: text("Release_Date").notNull(),
  Cards: text("Cards").notNull(),
  Name: text("Name").notNull(),
  SetID: text("SetID").notNull().unique(), 
});


export type SelectLorcanaSet = InferSelectModel<typeof lorcanaSets>;
export type InsertLorcanaSet = InferInsertModel<typeof lorcanaSets>;
