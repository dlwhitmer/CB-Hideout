import { MagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
type Props = {
  product: MagicSingle;
};

export default function MagicCardPrices({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4 w-full">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Card Prices:
      </h2>
      <div className="text-lg grid grid-cols-2 gap-1">
        <StatRow label="Market Normal" value={`$${" "}${product.price}`} />
        <StatRow label="Market Foil" value={`$${" "}${product.foilPrice}`} />
      </div>
    </section>
  );
}
