import { InsertMagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props = {
  product: InsertMagicSingle;
  showBack: boolean;
};

export default function MagicSingleInfo({ product, showBack }: Props) {
  const tough = showBack ? product.backToughness : product.frontToughness;
  const power = showBack ? product.backPower : product.backPower;
  const setname = product.setName;
  const rarity = product.rarity;
  const mv = product.cmc;

  return (
    <section className="p-3">
      <div className="stat-cat">
        <span>
          <h2 className="stat-h2">Card Information</h2>
        </span>
      </div>

      <div className="stat-rows">
        <StatRow label="Set Name" value={setname} />
        <StatRow label="Rarity" value={rarity} />
        <StatRow label="Toughness" value={tough} />
        <StatRow label="Power" value={power} />
        <StatRow label="Mana Value" value={mv} />
      </div>
    </section>
  );
}
