"use client";
import { InsertGundamCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
  product: InsertGundamCard;
};

export default function GundamCardHeader({ product }: Props) {
  const name = product.name;
  const cardnumber=product.cardNumber;
  const set = product.setName;
  const code = product.setCode;
  const rarity = product.rarity;
  const type = product.cardType;
  const color = product.color;

  return (
    <section>
  <div className="stat-cat">
    <span><h2 className="stat-h2">Card Name</h2></span>
    <span><p className="card-name">{name}</p></span>
  </div>

  <div className="stat-rows">
    <StatRow label="Card Number" value={cardnumber} align="center" />
    <StatRow label="Set Name" value={set} align="center" />
    <StatRow label="Set Code" value={code} align="center"/>
    <StatRow label="Rarity" value={rarity} align="center"/>
    <StatRow label="Card Type" value={type} align="center"/>
    <StatRow label="Card Color" value={color} align="center"/>
  </div>
</section>

  );
}
