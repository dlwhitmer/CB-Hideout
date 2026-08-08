import { MagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
type Props = {
  product: MagicSingle;
};

export default function MagicCardStats({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-1">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Card Stats
      </h2>
      {/* GENERAL */}
      <section className="mb-6">
        <div className="text-lg grid  pl-20 grid-cols-2 gap-2">
          <StatRow label="Power" value={product.frontPower} />
          <StatRow label="Toughness" value={product.frontToughness} />
        </div>
      </section>
    </section>
  );
}
