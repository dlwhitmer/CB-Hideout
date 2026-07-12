import { NewMagicSingle } from "../db/schema/magic";

/* -------------------------------------------------------
   MAGIC — SINGLE CARD MAPPER (snake_case)
------------------------------------------------------- */
export function mapMagicSingleToDB(card: any): NewMagicSingle {
  let image_small = null;
  let image_normal = null;

  // Normal single-faced card
  if (card.image_uris) {
    image_small = card.image_uris.small;
    image_normal = card.image_uris.normal;
  }

  // Double-faced card (DFC)
  else if (Array.isArray(card.card_faces) && card.card_faces.length > 0) {
    const face = card.card_faces[0];
    image_small = face.image_uris?.small ?? null;
    image_normal = face.image_uris?.normal ?? null;
  }

  return {
    scryfall_id: card.id,
    name: card.name,

    // ⭐ FIXED — Scryfall uses "set", not "set_code"
    set_code: card.set,
    set_name: card.set_name,

    mana_cost: card.mana_cost,
    cmc: card.cmc,

    colors: JSON.stringify(card.colors ?? []),
    color_identity: JSON.stringify(card.color_identity ?? []),

    power: card.power ?? null,
    toughness: card.toughness ?? null,

    keywords: JSON.stringify(card.keywords ?? []),

    type_line: card.type_line,
    oracle_text: card.oracle_text,
    layout: card.layout,

    // ⭐ store full card_faces JSON (snake_case)
    card_faces: card.card_faces ? JSON.stringify(card.card_faces) : null,

    collector_number: card.collector_number,
    rarity: card.rarity,

    price: Number(card.prices?.usd ?? 0),
    foil_price: Number(card.prices?.usd_foil ?? 0),

    quantity: 1,

    // ⭐ snake_case image fields
    image_small,
    image_normal,

    artist: card.artist,
    released_at: card.released_at,

    description: ""
  };
}
