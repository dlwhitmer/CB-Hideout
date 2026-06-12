
export interface MappedYugiohCard {
  yougiohId: string;
  name: string;

  typeline: string;
  type: string;

  humanReadableCardType: string | null;
  frameType: number | null;

  desc: string;
  race: string;

  atk: string | null;
  def: string | null;

  level: string;

  attribute: string;
  archetype: string | null;

  cardSets: string;
  cardImages: string | null;

  cardPrices: string;

  createdAt: string | null

  
}