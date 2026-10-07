"use client";
import { InsertGundamCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
  product: InsertGundamCard;
};

export default function GundamCardStats({ product }: Props) {
  const level = product.level;
  const cost = product.cost;
  const ap = product.ap;
  const hp = product.hp;
  const zone = product.zone;
  

  return (
    <section>
  <div className="stat-cat">
    <span><h2 className="stat-h2">Card Stats</h2></span>
   
  </div>

  <div className="stat-rows">
    <StatRow label="Level" value={level} align="center" />
    <StatRow label="Cost" value={cost} align="center"/>
    <StatRow label="AP" value={ap} align="center"/>
    <StatRow label="HP" value={hp} align="center"/>
    <StatRow label="Zone" value={zone} align="center"/>
  </div>
</section>

  );
}
