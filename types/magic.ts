export interface Product {
  id: number;
  scryfallId: string | null;
  name: string | null;
  setCode: string | null;
  setName: string | null;
  manaCost: string | null;
  cmc: number | null;
  colors: string | null;
  colorIdentity: string | null;
  power: string | null;
  toughness: string | null;
  keywords: string | null;
  typeLine: string | null;
  oracleText: string | null;
  layout: string | null;
  cardFaces: string | null;
  collectorNumber: string | null;
  rarity: string | null;
  price: number | null;
  imageUrl: string | null;
  artist: string | null;
  description: string | null;
  releaseAt: string | null;
  createdAt: string | null;
}
