import StatRow from "../../../StatRow";
import { MagicSingle } from "../../../../../lib/db/schema";

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

export default function MagicPurchaseInfo({ product }: Props) {
  return (
    <section className="stat-section">
      <h2 className="stat-cat">Purchase Information:</h2>
      <div className="stat-rows">
        <StatRow
          label="Our Price"
          value={`${" "}${formatPrice(product.price)}`}
        />
        <StatRow
          label="Our Foil Price"
          value={`${" "}${formatPrice(product.foilPrice)}`}
        />
        <StatRow label="In Stock" value={product.quantity} />
      </div>
      <div className="pt-8 col-span-3  flex justify-center">
        <button className="add-btn">
          Add To Cart
        </button>
      </div>
    </section>
  );
}
