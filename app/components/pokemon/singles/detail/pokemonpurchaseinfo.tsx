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
    <section className="bg-[#ffffff99] rounded shadow p-4">
      <h2 className="text-lg underline text-center font-extrabold mb-1">
        Purchase Information
      </h2>

      {/* GENERAL */}
      <section className="mb-">
        <div className="grid grid-cols-2 gap-4">
          <StatRow label="Our Price" value={`${" "}${formatPrice(product.price)}`} />
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
