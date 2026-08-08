import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { InferModel } from "drizzle-orm";

/* -------------------------------------------------------
   POKÉMON — SINGLES
------------------------------------------------------- */
export const pokemonSingles = sqliteTable("pokemon_singles", {
  id: integer("id").primaryKey(),
  game: text("game"),
  category: text("category"),
  pokemonId: text("pokemon_id").unique(),
  name: text("name"),
  setCode: text("set_code"),
  setName: text("set_name"),
  cardNumber: text("card_number"),
  rarity: text("rarity"),
  supertype: text("supertype"),
  subtypes: text("subtypes"),
  types: text("types"),
  hp: text("hp"),
  flavorText: text("flavor_text"),
  artist: text("artist"),
  imageSmall: text("image_small"),
  imageLarge: text("image_large"),
  weaknesses: text("weakness"),
  weaknessesValue: text("weakness_value"),
  resistances: text("resistances"),
  resistancesValue: text("resistance_value"),
  retreatCost: text("retreat_cost"),
  convertedRetreatCost: integer("converted_retreat_cost"),
  abilities: text("abilities"),
  series: text("series"),
  attacks: text("attacks"),
  price: real("price").notNull().default(0),
  marketPrice: real("market_price"),
  normalMarket: real("normal_market"),
  holofoilMarket: real("holofoil_market"),
  reverseHoloMarket: real("reversehalo_market"),
  releaseDate: text("release_date"),

  printedTotal: integer("printed_total"),
  total: integer("total"),

  updatedAt: text("updated_at"),

  logo: text("logo"),
  symbol: text("symbol"),
  lowPrice: real("low_price"),
  midPrice: real("mid_price"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  quantity: integer("quantity").notNull().default(1),
});

export type PokemonSingle = InferModel<typeof pokemonSingles>;
export type NewPokemonSingle = InferModel<typeof pokemonSingles, "insert">;
