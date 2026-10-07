"use client";
import { InsertLorcanaCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
  product: InsertLorcanaCard;
};

export default function LorcanaCardHeader({ product }: Props) {
  const name = product.Name;
 const rarity=product.Rarity;
 const set=product.SetName;
 const cardnum= product.CardNum;
 const art = product.Artist;


  return (
    <section>
  <div className="stat-cat">
    <span><h2 className="stat-h2">Card Name</h2></span>
    <span><p className="card-name">{name}</p></span>
  </div>

  <div className="stat-rows">
    <StatRow label="Rarity" value={rarity} />
    <StatRow label="Set Name" value={set} />
    <StatRow label="Card Number" value={cardnum}/>
    <StatRow label="Artist" value={art}/>
  </div>
</section>

  );
}
