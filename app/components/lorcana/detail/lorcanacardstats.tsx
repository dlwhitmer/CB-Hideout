"use client";
import { InsertLorcanaCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
  product: InsertLorcanaCard;
};

export default function LorcanaCardStats({ product }: Props) {
  const ink = product.Inkable;
  const inkcost = product.Cost;
  const type = product.Type;
  const classif = product.Classifications;
  return (
    <section>
      <div className="stat-cat">
        <h2 className="stat-h2">Card Stats</h2>
      </div>
      <div className="stat-rows">
        <StatRow label="Inkable" value={ink ? "Yes" : "No"} />
        <StatRow label="Ink Cost" value={inkcost} />
        <StatRow label="Card Type" value={type} />
        <StatRow label="Classifications" value={classif} />
      </div>
    </section>
  );
}
