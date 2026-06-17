export interface Product {
  id?: number; // optional because DB auto-generates it

  scryfallId: string;
  name: string;
  setCode: string;
  setName: string;

  manaCost: string | null;
  cmc: number | null;

  colors: string | null;
  colorIdentity: string | null;

  power: string | null;
  toughness: string | null;

  keywords: string | null;

  typeLine: string;
  oracleText: string | null;
  layout: string;

  cardFaces: string | null;

  collectorNumber: string;
  rarity: string;

  price: number;

  imageUrl: string | null;
  artist: string | null;

  // ⭐ FIXED: quantity must be a number
  quantity: number;

  description: string | null;

  releasedAt: string | null;

  // created_at is handled by DB, not mapper
  created_at?: string;
}
