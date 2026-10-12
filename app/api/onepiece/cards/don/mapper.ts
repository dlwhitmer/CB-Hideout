import { InsertOnePieceCard } from "../../../../../lib/db/schema";

export function mapOnePieceDonCardToDB(
  card: any,
  category: string,
): InsertOnePieceCard {
  return {
    inventoryPrice: card.inventory_price ?? 0,
    marketPrice: card.market_price ?? 0,
    cardName: card.card_name ?? "",
    setName: "DON!! Cards",
    cardText: card.card_text ?? "",
    setId: "DON",
    rarity: card.rarity ?? "",
    cardSetId: card.card_image_id ?? "",
    cardColor: "Colorless",
    cardType: "DON!!",
    category: "don",
    life: null,
    cardCost: 0,
    cardPower: 0,
    subTypes: "",
    counterAmount: 0,
    attribute: "",
    dateScraped: card.date_scraped ?? "",
    cardImageId: card.card_image_id ?? "",
    cardImage: card.card_image ?? "",
  };
}
