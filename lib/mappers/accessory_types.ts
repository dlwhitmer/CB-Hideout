
export interface MappedAccessory {
  productId: string;
  name: string;

  game: string;
  type: string;

  price: number;
  imageUrl: string | null;

  quantity: number| null;
  description: string;
}