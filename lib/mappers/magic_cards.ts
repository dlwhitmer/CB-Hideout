import { NewMagicCard } from "../db/schema/magic_cards";
function parseStat(value: any): number | null {
  if (!value) return null;
  if (typeof value !== "string") return null;
  if (!/^[0-9]+$/.test(value)) return null; // reject "*", "X", "*+1", etc.
  return parseInt(value);
}

export function mapMagicCardsToDB(card: any): NewMagicCard {
  const front = card.card_faces?.[0] ?? null;
  const back = card.card_faces?.[1] ?? null;

  const frontImageSmall =
    front?.image_uris?.small ?? card.image_uris?.small ?? null;

  const frontImageNormal =
    front?.image_uris?.normal ?? card.image_uris?.normal ?? null;

  const backImageSmall = back?.image_uris?.small ?? null;
  const backImageNormal = back?.image_uris?.normal ?? null;

  return {
    scryfallId: card.id,
    oracleId: card.oracle_id ?? null,

    // Scryfall uses "set" for cards
    setCode: card.set,
    setName: card.set_name,
    setType: card.set_type,

    finishes: JSON.stringify(card.finishes ?? []),
    digital: card.digital ?? false,

    cmc: card.cmc ?? null,

    colorIdentity: JSON.stringify(card.color_identity ?? []),
    keywords: JSON.stringify(card.keywords ?? []),

    layout: card.layout,
    name: card.name,

    card_faces: card.card_faces ? JSON.stringify(card.card_faces) : null,

    // FRONT
    frontName: front?.name ?? card.name ?? null,
    frontManaCost: front?.mana_cost ?? card.mana_cost ?? null,
    frontTypeLine: front?.type_line ?? card.type_line ?? null,
    frontOracleText: front?.oracle_text ?? card.oracle_text ?? null,
    frontColors: JSON.stringify(front?.colors ?? card.colors ?? []),

    frontPower: parseStat(front?.power ?? card.power),
    frontToughness: parseStat(front?.toughness ?? card.toughness),
    frontLoyalty: parseStat(front?.loyalty ?? card.loyalty),
    frontDefense: parseStat(front?.defense ?? card.defense),

    // BACK
    backName: back?.name ?? null,
    backManaCost: back?.mana_cost ?? null,
    backTypeLine: back?.type_line ?? null,
    backOracleText: back?.oracle_text ?? null,
    backColors: JSON.stringify(back?.colors ?? []),

    backPower: parseStat(back?.power),
    backToughness: parseStat(back?.toughness),
    backLoyalty: parseStat(back?.loyalty),
    backDefense: parseStat(back?.defense),

    // IMAGES
    frontImageSmall,
    frontImageNormal,
    backImageSmall,
    backImageNormal,

    // Legacy fields
    imageSmall: frontImageSmall,
    imageNormal: frontImageNormal,

    collectorNumber: card.collector_number ?? null,
    rarity: card.rarity ?? null,
    lang: card.lang ?? null,

    totalCards: card.total_cards ?? null,

    artist: card.artist ?? null,
    releasedAt: card.released_at ?? null,
  };
}
