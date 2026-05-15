export interface Product {
  id: string;
  scryfall_id: string;
  name: string;
  price: number;
  image_url: string | null;
  set_code: string | null;
  collector_number: string | null;
  rarity: string | null;
}