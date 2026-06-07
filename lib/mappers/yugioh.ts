export function mapYugiohToDB(card: any) {
  return {
    scryfall_id: card.id,
    name: card.name,

    set_code: card.set,
    set_name: card.set_name,

    mana_cost: card.mana_cost,
    cmc: card.cmc,

    colors: JSON.stringify(card.colors || []),
    color_identity: JSON.stringify(card.color_identity || []),

    power: card.power || null,
    toughness: card.toughness || null,

    keywords: JSON.stringify(card.keywords || []),

    type_line: card.type_line,
    oracle_text: card.oracle_text || null,

    layout: card.layout,

    card_faces: card.card_faces ? JSON.stringify(card.card_faces) : null,

    collector_number: card.collector_number,

    rarity: card.rarity,

    price: parseFloat(card.prices?.usd ?? "0") || 0,

    image_url:
      card.image_uris?.normal ||
      card.card_faces?.[0]?.image_uris?.normal ||
      null,

    artist: card.artist || null,

    released_at: card.released_at || null,

    description: "",
  };
}
