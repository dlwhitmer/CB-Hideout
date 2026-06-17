export function mapYugiohToDB(card: any){
  return {
    yugiohId: String(card.id),
    name: card.name ?? "",

    typeline: card.typeline ?? "",
    type: card.type ?? "",
    humanReadableCardType: card.human_readable_card_type ?? "",
    frameType: card.frameType ?? "",

    desc: card.desc ?? "",
    race: card.race ?? "",
    attribute: card.attribute ?? "",
    archetype: card.archetype ?? "",

    atk: card.atk ?? null,
    def: card.def ?? null,
    level: card.level ?? null,

    card_sets: JSON.stringify(card.card_sets ?? []),
    card_images: JSON.stringify(card.card_images ?? []),
    card_prices: JSON.stringify(card.card_prices ?? []),

    // MUST be a number because schema uses real()
    price: Number(card.card_prices?.[0]?.cardmarket_price ?? 0),

    quantity: 1,

    image_small: card.card_images?.[0]?.image_url_small ?? "",
    image_large: card.card_images?.[0]?.image_url ?? "",
  };
}
