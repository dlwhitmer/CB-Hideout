import { InsertMagicPrice } from "../db/schema";

export function mapMagicPricesToDB(card: any):InsertMagicPrice {
  const p = card.prices ?? {};

  return {
    scryfallId: card.id,

    usd: p.usd ? Number(p.usd) : null,
    usdFoil: p.usd_foil ? Number(p.usd_foil) : null,
    usdEtched: p.usd_etched ? Number(p.usd_etched) : null,
    eur: p.eur ? Number(p.eur) : null,
    eurFoil: p.eur_foil ? Number(p.eur_foil) : null,
    tix: p.tix ? Number(p.tix) : null,
    ourPrice: Number(p.our_price),
    ourFoil: Number(p.our_foil),
    ourEtched: Number(p.our_etched),

    fetchedAt: Date.now(),
  };
}
