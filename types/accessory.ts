export interface Accessory {
  id?: number;
  productId: string;
  name: string;
  game: string;
  type: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
  description: string;
}
