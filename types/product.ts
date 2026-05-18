// This is the clean, frontend-ready type your UI uses
export interface Product {
  id: number;
  scryfall_id: string;
  name: string;
  set_code: string;
  collector_number: string;
  rarity: string;
  price: number;
  image_url: string;
  type_line: string;
  oracle_text: string;
  artist: string;
  description: string;
}

// This matches EXACTLY what Turso/libSQL returns
export type ProductRow = {
  id: string | number | null;
  scryfall_id: string | null;
  name: string | null;
  set_code: string | null;
  collector_number: string | null;
  rarity: string | null;
  price: string | number | null;
  image_url: string | null;
  type_line: string | null;
  oracle_text: string | null;
  artist: string| null
  description: string | null;
};