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

export default function YugiohPurchaseInformation({ product }: Props) {
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Purchase Information
      </h2>

      {/* GENERAL */}
        <div className="stat-rows">
            <StatRow
                     label="Our Price"
                     value={`${" "}${formatPrice(
                       JSON.parse(product.cardPrices ?? "[]")[0]?.cardmarket_price,
                     )}`}
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
