import { InsertMagicSingle } from "../db/schema/magic_singles";

function getFace(single: any, index: number) {
  return single.card_faces?.[index] ?? null;
}

export function mapMagicSingleToDB(single: any): InsertMagicSingle {
  const front = getFace(single, 0);
  const back = getFace(single, 1);

  const frontImageSmall =
    front?.image_uris?.small ?? single.image_uris?.small ?? null;

  const frontImageNormal =
    front?.image_uris?.normal ?? single.image_uris?.normal ?? null;

  const backImageSmall = back?.image_uris?.small ?? null;

  const backImageNormal = back?.image_uris?.normal ?? null;

  return {
    scryfallId: single.id,
    oracleId: single.oracle_id ?? null,

    setCode: single.set,
    setName: single.set_name,
    setType: single.set_type,

    finishes: JSON.stringify(single.finishes ?? []),
    digital: single.digital ?? false,

    cmc: single.cmc,

    colorIdentity: JSON.stringify(single.color_identity ?? []),

    keywords: JSON.stringify(single.keywords ?? []),

    layout: single.layout,
    name: single.name,

    card_faces: single.card_faces ? JSON.stringify(single.card_faces) : null,

    // FRONT

    frontName: front?.name ?? single.name ?? null,

    frontManaCost: front?.mana_cost ?? single.mana_cost ?? null,

    frontTypeLine: front?.type_line ?? single.type_line ?? null,

    frontOracleText: front?.oracle_text ?? single.oracle_text ?? null,

    frontColors: JSON.stringify(front?.colors ?? single.colors ?? []),

    frontPower: front?.power ?? single.power ?? null,

    frontToughness: front?.toughness ?? single.toughness ?? null,

    frontLoyalty: front?.loyalty ?? single.loyalty ?? null,

    frontDefense: front?.defense ?? single.defense ?? null,

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

    collectorNumber: single.collector_number ?? null,

    rarity: single.rarity,
    lang: single.lang,

    quantity: 1,
    usd: single.usd ? Number(single.usd) : null,
    usdFoil: single.usd_foil ? Number(single.usd_foil) : null,
    usdEtched: single.usd_etched ? Number(single.usd_etched) : null,
    eur: single.eur ? Number(single.eur) : null,
    eurFoil: single.eur_foil ? Number(single.eur_foil) : null,
    tix: single.tix ? Number(single.tix) : null,
    ourPrice: Number(single.our_price),
    ourFoil: Number(single.our_foil),
    ourEtched: Number(single.our_etched),

    fetchedAt: Date.now(),

    artist: single.artist ?? null,
    condition:single.condition,
    releasedAt: single.released_at ?? null,
  };
}
