import { NewYugiohSingle,NewYugiohPrinting } from "../db/schema";

/* -------------------------------------------------------
   YU‑GI‑OH — SINGLE CARD MAPPER
------------------------------------------------------- */
export function mapYugiohSingleToDB(
  card: any,
  printing?: any,
): NewYugiohSingle {
  return {
    name: card.name ?? "",
    yugiohId: String(card.id),
    type: card.type ?? "",
    humanReadableCardType: card.humanReadableCardType ?? "",
    typeline: card.typeline?.join(" / ") ?? "",
    scale: card.scale ?? "",
    frameType: card.frameType ?? "",

    desc: card.desc ?? "",
    race: card.race ?? "",
    attribute: card.attribute ?? "",
    archetype: card.archetype ?? "",
    atk: card.atk ?? null,
    def: card.def ?? null,
    level: card.level ?? null,

    primarySet: printing?.set_name ?? "Unknown",

    linkval: card.linkval ?? null,
    linkmarkers: card.linkmarkers?.join(", ") ?? "",

    price: Number(card.card_prices?.[0]?.cardmarket_price ?? 0),
    cardSets: JSON.stringify(card.card_sets ?? []),
    cardImages: JSON.stringify(card.card_images ?? []),
    cardPrices: JSON.stringify(card.card_prices ?? []),

    imageSmall: card.card_images?.[0]?.image_url_small ?? "",
    imageLarge: card.card_images?.[0]?.image_url ?? "",

    quantity: 1,
    createdAt: new Date().toISOString(),
  };
}

export function mapYugiohPrintingsToDB(
  card: any,
  printing?: any,
): NewYugiohPrinting {
  return {
    yugiohId: String(card.id),
    setCode: printing?.set_code ?? "",
    setName: printing?.set_name ?? "Unknown",
    setRarity: printing?.set_rarity,
    marketValue: Number(printing?.set_price ?? 0),
  };
}
