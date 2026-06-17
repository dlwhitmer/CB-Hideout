import { Product } from "@/types/magic";

export function mapScryfallToDB(card: any): Product {
  return {
    scryfallId: card.id,
    name: card.name,
    setCode: card.set,
    setName: card.set_name,
    manaCost: card.mana_cost ?? null,
    cmc: card.cmc ?? null,
    colors: JSON.stringify(card.colors || []),
    colorIdentity: JSON.stringify(card.color_identity || []),
    power: card.power ?? null,
    toughness: card.toughness ?? null,
    keywords: JSON.stringify(card.keywords || []),
    typeLine: card.type_line,
    oracleText: card.oracle_text ?? null,
    layout: card.layout,
    cardFaces: card.card_faces ? JSON.stringify(card.card_faces) : null,
    collectorNumber: card.collector_number,
    rarity: card.rarity,
    
    // ⭐ ALWAYS SET DEFAULT QUANTITY
    quantity: 0,

    price: parseFloat(card.prices?.usd ?? "0") || 0,

    imageUrl:
      card.image_uris?.normal ||
      card.card_faces?.[0]?.image_uris?.normal ||
      null,

    artist: card.artist ?? null,
    releasedAt: card.released_at ?? null,

    // ⭐ DO NOT SET created_at — DB handles it
    description: "",
  };
}
