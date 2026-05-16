export interface Product {
  id: string | number | ArrayBuffer;
  scryfall_id: string;
  name: string;
  set_code: string | null;
  collector_number: string | null;
  rarity: string | null;
  price: number | null;
  image_url: string | null;
  type_line?: string | null;
  oracle_text?: string | null;
  description?: string | null;
}


