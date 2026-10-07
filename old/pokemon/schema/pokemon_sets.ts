import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";


export const pokemonSets = sqliteTable("pokemon_sets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  set_id: text("set_id").notNull(), // foreign key to pokemon_sets.setId
  name: text("name"),
  series: text("series"),
  printedTotal: integer("printed_total"),
  total: integer("total"),
  pctgo_code: text("ptcgo_code"),
  releaseDate: text("release_date"),
  updatedAt: text("updated_at"),
  symbolUrl: text("symbol_url"),
  logoUrl: text("logo_url"),
 
});

export type PokemonSet = InferSelectModel<typeof pokemonSets>;
export type NewPokemonSet = InferInsertModel<typeof pokemonSets>;
