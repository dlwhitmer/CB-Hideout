import { InsertMagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
import { getActiveFace } from "../../../../../lib/magic/cardfaces";

type Props = {
  product: InsertMagicSingle;
};

export default function MagicSingleCollector({ product }: Props) {
  const releaseDate = new Date(String(product.releasedAt));
  const setname = product.setName;
  const setcode = product.setCode;
  const rarity =product.rarity;
  const art=product.artist;
  const lang=product.lang;

  const formattedReleaseDate = isNaN(releaseDate.getTime())
    ? "Unknown"
    : releaseDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <section className="pb-3">
      <div className="stat-cat">
        <span>
          <h2 className="stat-h2">Collecting Information</h2>
        </span>
      </div>
      <div className="stat-rows">
        <StatRow label="Set Name" value={setname}/>
        <StatRow label="Set Code" value={setcode}/>
        <StatRow label="Rarity" value={rarity}/>
        <StatRow label="Artist" value={art}/>
        <StatRow label="Release Date" value={formattedReleaseDate}/>
        <StatRow label="Finishes" value={JSON.parse(product.finishes).join(", ")}/>

      </div>
    </section>
  );
}
