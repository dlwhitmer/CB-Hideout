"use client";
import { InsertLorcanaCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
  product: InsertLorcanaCard;
};

export default function LorcanaCardText({ product }: Props) {
  const abil = product.Abilities;
  const flavor = product.FlavorText;
  const body = product.BodyText;

  return (
    <section className="pb-10">
      <div className="stat-cat">
        <h2 className="stat-h2">Card Text</h2>
      </div>
      <div className="stat-rows divide-y divide-white">
        <StatRow label="Abilities" value={abil} />
        <StatRow label="Flavor Text" value={flavor} />
        <StatRow label="Body Text" value={body} />
      </div>
    </section>
  );
}
