import { Accessory } from "../../types/accessory";

export function mapAccessoryToDB(accessory: any): Accessory {
  return {
    productId: accessory.productId,
    name: accessory.name,
    game: accessory.game,
    type: accessory.type,
    price: Number(accessory.price) || 0,
    imageUrl: accessory.imageUrl ?? null,
    quantity: accessory.quantity ?? 0,
    description: accessory.description ?? "",
  };
}
