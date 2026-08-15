import { MagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
type Props = {
  product: MagicSingle;
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

export default function MagicCardPrices({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4 w-full">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Card Prices:
      </h2>
      <div className="text-lg grid grid-cols-2 gap-1">
        <StatRow label="Market Normal" value={`${" "}${formatPrice(product.price)}`} />
        <StatRow label="Market Foil" value={`${" "}${formatPrice(product.foilPrice)}`} />
      </div>
    </section>
  );
}
