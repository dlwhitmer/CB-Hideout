import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const pokemonSets = sqliteTable("pokemon_sets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  setName: text("set_name"),
  setCode: text("set_code"),
  setType: text("set_type"),
  series: text("series"),
  cardCount: integer("card_count"),
  releaseDate: text("release_date"),
  updatedAt: text("updated_at"),
  logoUrl: text("logo_url"),
});

export type PokemonSet = InferSelectModel<typeof pokemonSets>;
export type NewPokemonSet = InferInsertModel<typeof pokemonSets>;
