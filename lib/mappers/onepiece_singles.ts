import { InsertonePieceSingle } from "../db/schema/onepiece_singles";

export function mapOnePieceSingleToDB(single: any): InsertonePieceSingle {
  return {
    inventoryPrice: single.inventory_price,
    marketPrice: single.market_price,
    cardName: single.card_name,
    setName: single.set_name,
    cardText: single.card_text,
    setId: single.set_id,
    rarity: single.rarity,
    cardSetId: single.card_set_id,
    cardColor: single.card_color,
    cardType: single.card_type,
    life: single.life,
    cardCost: single.card_cost,
    cardPower: single.card_power,
    subTypes: single.sub_types,
    counterAmount: single.counter_amount,
    attribute: single.attribute,
    dateScraped: single.date_scraped,
    cardImageId: single.caed_image_id,
    cardImage: single.card_image,
  };
}
