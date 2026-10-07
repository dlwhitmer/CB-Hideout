import { InsertMagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props = {
  product: InsertMagicSingle;
};

export default function MagicCardCollector({ product }: Props) {
  const releaseDate = new Date(String(product.releasedAt));

  const formattedReleaseDate = isNaN(releaseDate.getTime())
    ? "Unknown"
    : releaseDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <section className="bg-[#ffffff]">
      <h2 className="">
        Collecting Information:
      </h2>
      <div
        className=" bg-[#ffffff] text-[13px] sm:text-[13px] md:text-[16px] lg:text-[18px] grid grid-cols-1 sm:grid-cols-2">
      
        <StatRow label="Set" value={product.setName} />
        <StatRow label="Set Code" value={product.setCode} />
        <StatRow label="Collector Number" value={product.collectorNumber} />
        <StatRow label="Rarity" value={product.rarity} />
        <StatRow label="Artist" value={product.artist} />
        <StatRow label="Release Date" value={formattedReleaseDate} />
        <StatRow label="language" value={product.lang} />
        <StatRow
          label="Finishes"
          value={JSON.parse(product.finishes).join(", ")}
        />
      </div>
    </section>
  );
}
