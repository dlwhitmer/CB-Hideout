import {NewMagicSingle} from "../db/schema/magic_singles";

function getFace(card: any, index: number) {
  return card.card_faces?.[index] ?? null;
}

export function mapMagicSingleToDB(card: any): NewMagicSingle {
  const front = getFace(card, 0);
  const back = getFace(card, 1);

  const frontImageSmall =
    front?.image_uris?.small ?? card.image_uris?.small ?? null;

  const frontImageNormal =
    front?.image_uris?.normal ?? card.image_uris?.normal ?? null;

  const backImageSmall = back?.image_uris?.small ?? null;

  const backImageNormal = back?.image_uris?.normal ?? null;

  return {
    scryfallId: card.id,
    oracleId: card.oracle_id ?? null,

    setCode: card.set,
    setName: card.set_name,
    setType: card.set_type,

    finishes: JSON.stringify(card.finishes ?? []),
    digital: card.digital ?? false,

    cmc: card.cmc,

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

    frontPower: front?.power ?? card.power ?? null,

    frontToughness: front?.toughness ?? card.toughness ?? null,

    frontLoyalty: front?.loyalty ?? card.loyalty ?? null,

    frontDefense: front?.defense ?? card.defense ?? null,

    // BACK

    backName: back?.name ?? null,

    backManaCost: back?.mana_cost ?? null,

    backTypeLine: back?.type_line ?? null,

    backOracleText: back?.oracle_text ?? null,

    backColors: JSON.stringify(back?.colors ?? []),

    backPower: back?.power ?? null,

    backToughness: back?.toughness ?? null,

    backLoyalty: back?.loyalty ?? null,

    backDefense: back?.defense ?? null,

    // Images

    frontImageSmall,
    frontImageNormal,

    backImageSmall,
    backImageNormal,

    // Keep old fields working

    imageSmall: frontImageSmall,
    imageNormal: frontImageNormal,

    collectorNumber: card.collector_number ?? null,

    rarity: card.rarity,
    lang: card.lang,

    price: Number(card.prices?.usd ?? 0),

    foilPrice: Number(card.prices?.usd_foil ?? 0),

    quantity: 1,

    cardCount: card.card_count ?? null,

    artist: card.artist ?? null,

    releasedAt: card.released_at ?? null,

    updatedAt: card.updated_at ?? null,

    createdAt: null,
  };
}
