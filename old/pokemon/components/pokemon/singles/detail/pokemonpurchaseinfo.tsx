import StatRow from "../../../StatRow";
import { PokemonSingle } from "../../../../../lib/db/schema";

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

export default function PokemonPurchaseInfo({ product }: Props) {
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Purchase Information
      </h2>
        <div className="stat-rows">
          <StatRow label="Our Price" value={`${" "}${formatPrice(product.price)}`} />
          <StatRow label="In Stock" value={product.quantity} />
          <div className="col-span-2 pt-4 border-t-3 flex justify-center">
            <button className="add-btn">
              Add To Cart
            </button>
          </div>
        </div>
      </section>
  
  );
}
