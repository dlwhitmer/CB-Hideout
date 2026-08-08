import { PokemonSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props = {
  product: PokemonSingle;
};

export default function PokemonCardHeader({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <div className="text-center font-bold">
        <h2 className="text-xl">Card Name:</h2>
        <p className="text-lg mb-2 ">{product.name}</p>
      </div>
      <div className="text-lg grid grid-cols-2 gap-1">
        <StatRow label="Set Name:" value={product.setName} />
        <StatRow label="Set Code" value={product.setCode} />
        <StatRow
          label="Number of Total"
          value={`${product.cardNumber} of ${product.total}`}
        />
        <StatRow label="Rarity" value={product.rarity} />
        <StatRow label="Type" value={product.types} />
        <StatRow label="Super Type" value={product.supertype} />
        <StatRow label="Sub Type" value={product.subtypes} />
      </div>
    </section>
  );
}
