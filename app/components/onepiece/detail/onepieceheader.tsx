import { InsertOnePieceCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
  product: InsertOnePieceCard;
};
export default function OnePieceHeader({ product }: Props) {
  const name = product.cardName;
  const setname = product.setName;
  const setcode = product.setId;
  const rarity = product.rarity;
  const type = product.cardType;
  const color = product.cardColor;
  return (
    <section>
      <div className="stat-cat">
        <span>
          <h2 className="stat-h2">Card Name</h2>
        </span>
        <span>
          <p className="card-name">{name} </p>
        </span>
      </div>
      <div className="stat-rows">
        <StatRow label="SetName" value={setname}/>
        <StatRow label="Set Code" value={setcode}/>
        <StatRow label="Rarity" value={rarity}/>
        <StatRow label="Card Type" value={type}/>
        <StatRow label="Card Color" value={color}  />
      </div>
    </section>
  );
}
