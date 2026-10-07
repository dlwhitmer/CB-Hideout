import { PokemonSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
type Props = {
  product: PokemonSingle;
};

function formatPrice(price: number | string | null | undefined) {
  if (price === null || price === undefined || price === "") {
    return "$0.00";
  }

  return Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function PokemonCardPrices({ product }: Props) {
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Card Prices
      </h2>
      <div className="stat-rows">
        <StatRow label="Our Price" value={`${" "}${formatPrice(product.price)}`} />
        <StatRow
          label="Market"
          value={product.marketPrice ? `${formatPrice(product.marketPrice)}` : null}
        />
        <StatRow
          label="Normal Market"
          value={product.normalMarket ? `${formatPrice(product.normalMarket)}` : null}
        />

        <StatRow
          label="Reverse Holo"
          value={
            product.reverseHoloMarket ? `${formatPrice(product.reverseHoloMarket)}` : null
          }
        />

        <StatRow
          label="Holo Foil"
          value={product.holofoilMarket ? `${formatPrice(product.holofoilMarket)}` : null}
        />
      </div>
    </section>
  );
}
