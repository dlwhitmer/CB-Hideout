import { MagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props = {
  product: MagicSingle;
};

export default function MagicCardCollector({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4 w-full">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Collecting Information
      </h2>
      <div className="text-lg grid grid-cols-2 gap-1">
        <StatRow label="Set" value={product.setName} />
        <StatRow label="Set Code" value={product.setCode} />
        <StatRow label="Collector Number" value={product.collectorNumber} />
        <StatRow label="Rarity" value={product.rarity} />
        <StatRow label="Artist" value={product.artist} />
        <StatRow label="Release Date" value={product.releasedAt} />
        <StatRow label="language" value={product.lang} />
        <StatRow
          label="Finishes"
          value={JSON.parse(product.finishes).join(", ")}
        />
      </div>
    </section>
  );
}
