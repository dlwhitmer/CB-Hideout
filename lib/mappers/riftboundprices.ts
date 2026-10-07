import { InsertRiftBoundPrice } from "../db/schema/riftbound_prices";

export function mapRiftBoundPricesToDB(price: any): InsertRiftBoundPrice{
    return {
  apiId: price.api_id,
  riftboundId: price.riftboundId,
  name: price.name,
  rarity: price.rarity,
  expansion: price.expansion,
  artist: price.artist,
  image: price.image,
  tcggoUrl: price.tcggo_url,

  prices: JSON.stringify(price.prices ?? {}),
  gradedPrices: JSON.stringify(price.graded_prices ?? {}),

  lastUpdated: price.lastUpdated ?? null,
};
}