export interface YugiohProduct {
  id: number;
  yugiohId: string;
  name: string;
  typeline: string | null;
  type: string | null;
  humanReadableCardType: string | null;
  frameType: string | null;
  desc: string | null;
  race: string | null;
  atk: number | null;
  def: number | null;
  level: number | null;
  attribute: string | null;
  archetype: string | null;

  card_sets: string | null;
  card_images: string | null;
  card_prices: string | null;

  price: string | null;
  image_small: string | null;
  image_large: string | null;

  created_at: string | null;
}
