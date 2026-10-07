import { NewPokemonCard } from "../db/schema";

/* -------------------------------------------------------
   POKÉMON — SINGLE CARD MAPPER
------------------------------------------------------- */
export function mapPokemonCardToDB(card: any): NewPokemonCard {
  return {
    game: "pokemon",
    category: "Pokémon",

    pokemonId: card.id ?? "",
    name: card.name ?? "",

    setCode: card.set?.id ?? "",
    set_id: card.set?.id ?? "",

    setName: card.set?.name ?? "",

    cardNumber: card.number ?? "",
    rarity: card.rarity ?? "",
    supertype: card.supertype ?? "",

    subtypes: card.subtypes?.join(", ") ?? null,
    types: card.types?.join(", ") ?? null,

    hp: card.hp ?? "",
    flavorText: card.flavorText ?? "",
    artist: card.artist ?? "",

    imageSmall: card.images?.small ?? "",
    imageLarge: card.images?.large ?? "",

    printedTotal: card.set?.printedTotal ?? null,
    total: card.set?.total ?? null,
    series: card.series ?? "",

    weaknesses: card.weaknesses?.[0]?.type ?? null,
    weaknessesValue: card.weaknesses?.[0]?.value ?? null,

    resistances: card.resistances?.[0]?.type ?? null,
    resistancesValue: card.resistances?.[0]?.value ?? null,

    retreatCost: JSON.stringify(card.retreatCost ?? []),
    convertedRetreatCost: card.convertedRetreatCost ?? 0,

    abilities: JSON.stringify(card.abilities ?? []),
    attacks: JSON.stringify(card.attacks ?? []),

    releaseDate: card.set?.releaseDate ?? null,
    updatedAt: new Date().toISOString(),

    logo: card.set?.images?.logo ?? null,
    symbol: card.set?.images?.symbol ?? null,

    quantity: 1,

  };
}
