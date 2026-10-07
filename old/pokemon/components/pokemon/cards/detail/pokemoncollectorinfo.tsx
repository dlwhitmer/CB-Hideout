import {PokemonCard} from "../../../../../lib/db/schema/pokemon_cards";
import StatRow from "../../../StatRow";
type Props = {
  product: PokemonCard;
};

export default function PokemonCollector({ product}: Props) {
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Collecting Information
      </h2>
      <div className="stat-rows">
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
