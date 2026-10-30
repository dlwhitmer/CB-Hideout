"use client";
import { InsertLorcanaSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props = {
  product: InsertLorcanaSingle;
};

export default function LorcanaSinglesLocationStats({ product }: Props) {
  const move = product.MoveCost;
  const will = product.Willpower;
  const lore = product.Lore;
  return (
    <section>
      <div className="stat-cat">
        <h2 className="stat-h2">Location Stats</h2>
      </div>
      <div className="stat-rows">
        <StatRow label="Move Cost" value={move} />
        <StatRow label="Willpower" value={will} />
        <StatRow label="Lore" value={lore} />
      </div>
    </section>
  );
}
