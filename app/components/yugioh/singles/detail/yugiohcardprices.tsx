import StatRow from "../../../StatRow";
import { YugiohSingle } from "../../../../../lib/db/schema";

type Props = {
  product: YugiohSingle;
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

export default function YugiohPrices({ product }: Props) {
  const prices = product.cardPrices ? JSON.parse(product.cardPrices) : [];

  const market = prices[0];
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Prices:
      </h2>

      {/* GENERAL */}

        <div className="stat-rows">
          <StatRow
            label="Market Price"
            value={`${" "}${formatPrice(
              JSON.parse(product.cardPrices ?? "[]")[0]?.cardmarket_price,
            )}`}
          />
          <StatRow
            label="TcgPlayer Price"
            value={`${" "}${formatPrice(
              JSON.parse(product.cardPrices ?? "[]")[0]?.tcgplayer_price,
            )}`}
          />
        
        </div>
      </section>

  );
}
