import { InsertOnePieceCard } from "../db/schema/onepiece_cards";

export function mapOnePieceCardToDB(
  card: any,
  category: string,
): InsertOnePieceCard {
  return {
    inventoryPrice: card.inventory_price,
    marketPrice: card.market_price,
    cardName: card.card_name,
    setName: card.set_name,
    cardText: card.card_text,
    setId: card.set_id,
    rarity: card.rarity,
    cardSetId: card.card_set_id,
    category,
    cardColor: card.card_color,
    cardType: card.card_type,
    life: card.life,
    cardCost: card.card_cost,
    cardPower: card.card_power,
    subTypes: card.sub_types,
    counterAmount: card.counter_amount,
    attribute: card.attribute,
    dateScraped: card.date_scraped,
    cardSetImageId: card.card_set_image_id,
    cardImage: card.card_image,
  };
}
