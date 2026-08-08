import { YugiohSingle, YugiohPrinting } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
type Props = {
  product: YugiohSingle;
  printing?: YugiohPrinting;
};

export default function CardStats({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Card Stats
      </h2>

      {/* GENERAL */}
      <section className="mb-6">
        <h3 className="font-extrabold text-lg text-center border-b mb-2">General</h3>

        <div className=" text-lg grid h-8 grid-cols-2 ">
          <StatRow label="Type" value={product.type} />
          <StatRow label="Race" value={product.race} />
          <StatRow label="Attribute" value={product.attribute} />
          <StatRow label="Archetype" value={product.archetype} />
        </div>
      </section>

      {/* MONSTER STATS */}
      {(product.atk || product.def || product.level) && (
        <section className="mb-6">
          <h3 className="font-extrabold text-lg text-center border-b-2 mb-2">
            Monster Stats
          </h3>

          <div className="h-8 grid grid-cols-2 ">
            <StatRow label="ATK" value={product.atk} />
            <StatRow label="DEF" value={product.def} />
            <StatRow label="Level / Rank" value={product.level} />
          </div>
        </section>
      )}

      {/* LINK INFORMATION */}
      {product.frameType === "link" && (
        <section className="mb-6">
          <h3 className="font-extrabold text-lg text-center border-b mb-2">
            Link Information
          </h3>

          <StatRow label="Link Rating" value={product.linkval} />

          <StatRow label="Link Markers" value={product.linkmarkers} />
        </section>
      )}
    </section>
  );
}
