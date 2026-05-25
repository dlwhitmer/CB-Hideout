// This is the clean, frontend-ready type your UI uses
export interface Product {
  id: number;
  scryfall_id: string;
  name: string;
  set_code: string;
  set_name?: string;

  mana_cost?: string;
  cmc?: number;

  colors?: string;
  color_identity?: string;

  power?: string;
  toughness?: string;

  type_line: string;
  oracle_text?: string;

  rarity: string;
  price: number;
  collector_number: string;
  image_url: string;
  artist?: string;
  description: string;
  released_at?: string;
}

// This matches EXACTLY what Turso/libSQL returns
export type ProductRow = {
  id: number;
  scryfall_id: string;
  name: string;

  set_code?: string;
  set_name?: string;

  mana_cost?: string;
  cmc?: number;

  colors?: string; // JSON string for now
  color_identity?: string;

  power?: string;
  toughness?: string;

  keywords?: string;
  type_line?: string;
  oracle_text?: string;

  layout?: string;
  card_faces?: string;

  collector_number?: string;
  rarity?: string;

  price?: number;
  image_url?: string;

  artist?: string;
  released_at?: string;
  description?: string;

  created_at: string;
};
