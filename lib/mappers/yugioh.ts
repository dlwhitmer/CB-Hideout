import { NewYugiohSingle,NewYugiohPack,NewYugiohSet } from "../db/schema/yugioh";

/* -------------------------------------------------------
   YU‑GI‑OH — SINGLE CARD MAPPER
------------------------------------------------------- */
export function mapYugiohSingleToDB(card: any): NewYugiohSingle {
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

    cardSets: JSON.stringify(card.card_sets ?? []),
    cardImages: JSON.stringify(card.card_images ?? []),
    cardPrices: JSON.stringify(card.card_prices ?? []),

    price: Number(card.card_prices?.[0]?.cardmarket_price ?? 0),

    imageSmall: card.card_images?.[0]?.image_url_small ?? "",
    imageLarge: card.card_images?.[0]?.image_url ?? "",

    quantity: 1,
    createdAt: new Date().toISOString(),
  };
}

/* -------------------------------------------------------
   YU‑GI‑OH — SET MAPPER
------------------------------------------------------- */
export function mapYugiohSetToDB(set: any): NewYugiohSet {
  return {
    setCode: set.set_code,
    setName: set.set_name ?? set.name ?? "",
    releaseDate: set.release_date ?? "",
    totalCards: set.total_cards ?? null,

    imageUrl:
      set.image_url ??
      set.image_uris?.normal ??
      set.images?.logo ??
      set.images?.symbol ??
      null,

    createdAt: set.created_at ?? new Date().toISOString(),
  };
}

/* -------------------------------------------------------
   YU‑GI‑OH — PACK MAPPER
------------------------------------------------------- */
export function mapYugiohPackToDB(pack: any): NewYugiohPack {
  return {
    setCode: pack.set_code,
    packName: pack.pack_name ?? pack.name ?? "",

    price: Number(pack.price ?? 0),
    quantity: 1,

    imageUrl:
      pack.image_url ??
      pack.image_uris?.normal ??
      pack.images?.logo ??
      pack.images?.symbol ??
      null,

    createdAt: new Date().toISOString(),
  };
}
