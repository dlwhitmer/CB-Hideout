
export function mapPokemonToDB(card: any){
  if (!card) {
    throw new Error("mapPokemonToDB received undefined card");
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
    quantity: 0,
    hp: card.hp ?? "",
    types: card.types?.join(", ") ?? null,
    artist: card.artist ?? "",
    imageSmall: card.images?.small ?? "",
    imageLarge: card.images?.large ?? "",
    price: parseFloat(card.cardmarket?.prices?.averageSellPrice ?? "0") || 0,
    releaseDate: card.set?.releaseDate ?? "",
    createdAt: new Date().toISOString(),
  };
}