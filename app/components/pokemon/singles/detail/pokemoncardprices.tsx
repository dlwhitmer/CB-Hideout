import { PokemonSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
type Props = {
  product: PokemonSingle;
};

export default function PokemonCardPrices({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Card Prices
      </h2>
      <div className="text-lg grid grid-cols-2 gap-1">
        <StatRow label="Our Price" value={`$${" "}${product.price}`} />
        <StatRow
          label="Market"
          value={product.marketPrice ? `$ ${product.marketPrice}` : null}
        />
        <StatRow
          label="Normal Market"
          value={product.normalMarket ? `$ ${product.normalMarket}` : null}
        />

        <StatRow
          label="Reverse Holo"
          value={
            product.reverseHoloMarket ? `$ ${product.reverseHoloMarket}` : null
          }
        />

        <StatRow
          label="Holo Foil"
          value={product.holofoilMarket ? `$ ${product.holofoilMarket}` : null}
        />
      </div>
    </section>
  );
}
