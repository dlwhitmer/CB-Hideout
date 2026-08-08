import { NewPokemonSingle } from "../db/schema";

/* -------------------------------------------------------
   POKÉMON — SINGLE CARD MAPPER
------------------------------------------------------- */
export function mapPokemonSingleToDB(card: any): NewPokemonSingle {
  if (!card) {
    throw new Error("mapPokemonSingleToDB received undefined card");
  }

  const prices = card.tcgplayer?.prices;

  const market =
    prices?.normal?.market ??
    prices?.holofoil?.market ??
    prices?.reverseHolofoil?.market ??
    prices?.["1stEditionHolofoil"]?.market ??
    null;

  const low =
    prices?.normal?.low ??
    prices?.holofoil?.low ??
    prices?.reverseHolofoil?.low ??
    prices?.["1stEditionHolofoil"]?.low ??
    null;

  const mid =
    prices?.normal?.mid ??
    prices?.holofoil?.mid ??
    prices?.reverseHolofoil?.mid ??
     prices?.["1stEditionHolofoil"]?.mid ??
    null;

  return {
    game: "pokemon",
    category: "Pokémon",

    pokemonId: card.id ?? "",
    name: card.name ?? "",

    setCode: card.set?.id ?? "",
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

    price: market ?? 0,

    marketPrice: market ?? 0,
    printedTotal: card.set?.printedTotal ?? null,
    total: card.set?.total ?? null,

    normalMarket: prices?.normal?.market ?? 0,

    holofoilMarket: prices?.holofoil?.market ?? 0,

    reverseHoloMarket: prices?.reverseHolofoil?.market ?? 0,
    series: card.series ?? "",

    lowPrice: low ?? 0,

    midPrice: mid ?? 0,
    weaknesses: card.weaknesses?.[0]?.type ?? null,
    weaknessesValue: card.weaknesses?.[0]?.value ?? null,

    resistances: card.resistances?.[0]?.type ?? null,
    resistancesValue: card.resistances?.[0]?.value ?? null,
    retreatCost: JSON.stringify(card.retreatCost ?? []),
    convertedRetreatCost: card.convertedRetreatCost ?? 0,
    abilities: JSON.stringify(card.abilities ?? []),
    attacks: JSON.stringify(card.attacks ?? []),
    quantity: 1,

    createdAt: new Date().toISOString(),
  };
}
