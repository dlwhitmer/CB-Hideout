import { InsertGundamCard } from "../db/schema/gundam_cards";

export function mapGundamCardToDB(card: any): InsertGundamCard {
  return {
    productID: card.product_id,
    cardNumber: card.card_number,
    name: card.name,
    setCode: card.set_code,
    setName: card.set_name,
    rarity: card.rarity,
    cardType: card.card_type,
    color: card.color ?? null,
    ap: card.ap ?? "0",
    hp: card.hp ?? "0",
    level: card.level ?? "0",
    cost: card.cost ?? "0",
    zone: card.zone,
    trait: card.trait,
    traits: card.traits ?? [],
    effect: card.effect,
    keywordEffects: card.keyword_effects ?? [],
    linkRefs: card.link_refs ?? [],
    imageUrl: card.image_url,
  };
}

