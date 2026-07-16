import { NewPokemonSingle} from "../db/schema/pokemon";

/* -------------------------------------------------------
   POKÉMON — SINGLE CARD MAPPER
------------------------------------------------------- */
export function mapPokemonSingleToDB(card: any): NewPokemonSingle {
  if (!card) {
    throw new Error("mapPokemonSingleToDB received undefined card");
  }

  return {
    pokemonId: card.id ?? "",
    game: "pokemon",
    category: card.supertype ?? "",
    name: card.name ?? "",

    setCode: card.set?.id ?? "",
    setName: card.set?.name ?? "",

    cardNumber: card.number ?? "",
    rarity: card.rarity ?? "",
    flavorText: card.flavorText ?? "",

    supertype: card.supertype ?? "",
    subtypes: card.subtypes?.join(", ") ?? null,

    hp: card.hp ?? "",
    types: card.types?.join(", ") ?? null,

    artist: card.artist ?? "",

    imageSmall: card.images?.small ?? "",
    imageLarge: card.images?.large ?? "",

    price: parseFloat(card.cardmarket?.prices?.averageSellPrice ?? "0") || 0,

    releaseDate: card.set?.releaseDate ?? "",
    createdAt: new Date().toISOString(),

    quantity: 1,
  };
}

/* -------------------------------------------------------
   POKÉMON — SET MAPPER
------------------------------------------------------- */
export function mapPokemonSetToDB(set: any){
  return {
    setCode: set.set_code,
    setName: set.set_name ?? set.name ?? "",
    series: set.series ?? "",

    printedTotal: set.printed_total ?? null,
    totalCards: Number(set.total_cards ?? 0),

    releaseDate: set.release_date ?? "",


    imageUrl:
      set.image_url ??
      set.image_uris?.normal ??
      set.images?.logo ??
      set.images?.symbol ??
      null,

    logoUrl: set.logo_url ?? null,
    symbolUrl: set.symbol_url ?? null,
  };
}