
export interface MappedMagicCard {
  scryfallId: string;
  name: string;

  setCode: string;
  setName: string;

  manaCost: string | null;
  cmc: number | null;

  colors: string;
  colorIdentity: string;

  power: string | null;
  toughness: string | null;

  keywords: string;

  typeLine: string;
  oracleText: string | null;

  layout: string;
  cardFaces: string | null;

  collectorNumber: string;
  rarity: string;

  flavorText: string;
  supertypes: string;
  price: number;

  imageUrl: string | null;
  artist: string | null;

  releasedAt: string | null;

  description: string;
}