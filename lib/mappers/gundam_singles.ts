import { InsertGundamSingle } from "../db/schema/gundam_singles";

export function mapGundamSingleToDB(single: any): InsertGundamSingle {
  return {
    productId: single.product_id,
    cardNumber: single.card_number,
    name: single.name,
    setCode: single.set_code,
    setName: single.set_name,
    rarity: single.rarity,
    cardType: single.card_type,
    colors: single.color,
    level: single.level,
    cost: single.cost,
    ap: single.ap,
    hp: single.hp,
    zone: single.zone,
    trait: single.trait,
    traits: single.traits ?? [],
    effect: single.effect,
    keyboardEffects: single.keyword_effects ?? [],
    imageUrl: single.image_url,
    detailImageUrl: single.detail_image_url,
    linkRefs: single.link_refs ?? [],
    // You add price manually later
    price: 0,
  };
}
