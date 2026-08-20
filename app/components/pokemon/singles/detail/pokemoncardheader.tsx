import { PokemonSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props = {
  product: PokemonSingle;
};

export default function PokemonCardHeader({ product }: Props) {
  return (
    <section className="stat-section">
  <div>
    <h2 className="stat-cat">Card Name:</h2>
    <div className="card-name">{product.name}</div>
  </div>
      
    
      <div className="stat-rows">
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
