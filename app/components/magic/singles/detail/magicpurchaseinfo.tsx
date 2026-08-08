import StatRow from "../../../StatRow";
import { MagicSingle } from "../../../../../lib/db/schema";

type Props = {
  product: MagicSingle;
};

export default function MagicPurchaseInfo({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <h2 className="text-lg underline text-center font-extrabold mb-1">
        Purchase Information
      </h2>

      {/* GENERAL */}
      <section className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <StatRow label="Your Normal" value={`$${" "}${product.price}`} />
          <StatRow label="Your Foil" value={`$${" "}${product.foilPrice}`} />
          <StatRow label="In Stock" value={product.quantity} />
          <div className="col-span-2 flex justify-center">
            <button className="text-black font-bold bg-yellow-400 px-6 py-2 rounded shadow">
              Add To Cart
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
