import type { InsertLorcanaPrice } from "../db/schema/lorcana_prices";

export function mapLorcanaPricesToDB(p: any): InsertLorcanaPrice {
  return {
    cardId: p.id,
    lowestNearMint:
      p.prices?.cardmarket?.lowest_near_mint != null
        ? Number(p.prices.cardmarket.lowest_near_mint)
        : null,
    currency: p.prices?.cardmarket?.currency
      ? String(p.prices.cardmarket.currency)
      : "EUR",
    fetchedAt: Date.now(),
  };
}
