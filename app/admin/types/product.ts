export interface Product {
  id: number;
  scryfall_id: string;
  name: string;
  price: number;
  image_url: string;
  set_code?: string;
  rarity?: string;
  type_line?: string;
  oracle_text?: string;
  description?: string;
  collector_number?: string;
}

