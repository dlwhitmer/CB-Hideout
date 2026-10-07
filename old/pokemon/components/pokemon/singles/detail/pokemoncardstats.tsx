import { PokemonSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
type Props = {
  product: PokemonSingle;
};

export default function PokemonCardStats({ product }: Props) {
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Card Stats
      </h2>
      <div className="stat-rows">
        <StatRow label="HP" value={product.hp} />
        <StatRow label="Types" value={product.types} />
        <StatRow
          label="Weakness"
          value={`${product.weaknesses} ${product.weaknessesValue}`}
        />
        <StatRow
          label="Resistance"
          value={`${product.resistances} ${product.resistancesValue}`}
        />
        <StatRow
          label="Retreat Cost"
          value={
            product.retreatCost
              ? `${JSON.parse(product.retreatCost)[0]} ×${product.convertedRetreatCost}`
              : ""
          }
        />
      </div>
    </section>
  );
}
