import { MagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props = {
  product: MagicSingle;
  showBack: boolean;
};

export default function MagicCardInformation({ product, showBack }: Props) {
  const toughness = showBack ? product.backToughness : product.frontToughness;
  const power = showBack ? product.backPower : product.frontPower;
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Card Stats:
      </h2>
      {/* GENERAL */}
      <section className="mb-6">
        <div className="text-[13px] sm:text-[13px] md:text-[16px] lg:text-[18px] grid grid-cols-1 sm:grid-cols-2 gap-1">
          <StatRow label="Set" value={product.setName} />
          <StatRow label="Rarity" value={product.rarity} />
          <StatRow label="Toughness" value={toughness} />
          <StatRow label="Power" value={power} />
          <StatRow label="Mana Value" value={product.cmc} />
        </div>
      </section>
    </section>
  );
}
