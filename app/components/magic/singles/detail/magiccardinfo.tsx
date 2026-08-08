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
    <section className="bg-[var(--dpm)] rounded shadow p-4 w-full">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Card Stats
      </h2>
      {/* GENERAL */}
      <section className="mb-6">
        <div className="text-lg grid grid-cols-2 gap-2">
          <StatRow label="Set Name" value={product.setName} />
          <StatRow label="Rarity" value={product.rarity} />
          <StatRow label="Toughness" value={toughness} />
          <StatRow label="Power" value={power} />
          <StatRow label="Mana Value" value={product.cmc} />
        </div>
      </section>
    </section>
  );
}
