import { InsertRiftBoundPrice } from "../db/schema/riftbound_prices";

export function mapRiftboundPriceToDB(price: any):InsertRiftBoundPrice {
  return {
    riftboundId: price.riftboundId,
    collector: price.collector,
    slug: price.slug,
    tcgId: price.tcgId,
    finishes: price.finishes,

    lastUpdated: price.updatedAt,
  };
}