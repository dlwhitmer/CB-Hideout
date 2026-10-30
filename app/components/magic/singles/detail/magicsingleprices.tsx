import { InsertMagicSingle } from "../../../../../lib/db/schema";
import { InsertMagicPrice } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props = {
  product: InsertMagicSingle;
  price: InsertMagicPrice | null;
};

export default function MagicSinglePrices({ product, price }: Props) {
  const market = price?.usd;
  const our=price.ourPrice

  return (
    <section className="pb-3">
      <div className="stat-cat">
        <span>
          <h2 className="stat-h2">Purchase Information</h2>
        </span>
      </div>

      <div className="stat-rows">
        <StatRow label="Market Price" value={market != null ? `$${market.toFixed(2)}` : "N/A"}
        />
        <StatRow label="Selling Price" value={`$${Number(our).toFixed(2)}`}/>
      </div>
    </section>
  );
}