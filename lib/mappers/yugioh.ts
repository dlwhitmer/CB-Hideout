import { YugiohProduct } from "@/types/yugioh";

export function mapYugiohToDB(card: any): Omit<YugiohProduct, "id"> {
  return {
    yugiohId: String(card.id),
    name: card.name ?? "",

    typeline: JSON.stringify(card.typeline ?? []),
    type: card.type ?? "",
    humanReadableCardType: card.humanReadableCardType ?? "",
    frameType: card.frameType ?? "",

    desc: card.desc ?? "",
    race: card.race ?? "",
    atk: card.atk ?? null,
    def: card.def ?? null,
    level: card.level ?? null,
    attribute: card.attribute ?? "",
    archetype: card.archetype ?? "",

    // MATCH DB EXACTLY
    card_sets: JSON.stringify(card.card_sets ?? []),
    card_images: JSON.stringify(card.card_images ?? []),
    card_prices: JSON.stringify(card.card_prices ?? []),

    // PRICE
    price: card.card_prices?.[0]?.cardmarket_price ?? "0.00",

    // IMAGES
    image_small: card.card_images?.[0]?.image_url_small ?? "",
    image_large: card.card_images?.[0]?.image_url ?? "",

    // DB auto-fills this
    created_at: null,
  };
}
