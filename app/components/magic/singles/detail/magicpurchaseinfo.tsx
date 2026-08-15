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
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <h2 className="text-[13px] sm:text-[13px] md:text-[16px] lg:text-[18px] text-center font-extrabold">
        Purchase Information
      </h2>

      {/* GENERAL */}
      <section className="mb-4">
        <div className="text-[13px] sm:text-[13px] md:text-[16px] lg:text-[18px] grid grid-cols-1 sm:grid-cols-3 gap-1">
          <StatRow label="Your Normal" value={`${" "}${formatPrice(product.price)}`} />
          <StatRow label="Your Foil" value={`${" "}${formatPrice(product.foilPrice)}`} />
          <StatRow label="In Stock" value={product.quantity} />
          <div className="pt-10 col-span-3 flex justify-center">
            <button className="text-black font-bold bg-yellow-400 px-6 py-2 rounded shadow">
              Add To Cart
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
