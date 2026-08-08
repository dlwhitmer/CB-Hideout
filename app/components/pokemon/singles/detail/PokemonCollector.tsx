import { PokemonSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
type Props = {
  product: PokemonSingle;

};

export default function PokemonCollector({ product}: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Collecting Information
      </h2>
      <div className="text-lg grid grid-cols-2 gap-1">
        <StatRow label="Set" value={product.setName} />
        <StatRow
          label="Number of Total"
          value={`${product.cardNumber} of ${product.total}`}
        />
        <StatRow label="Artist" value={product.artist} />
        <StatRow label="Release Date" value={product.releaseDate} />
      </div>
    </section>
  );
}
