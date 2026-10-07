import { InsertMagicCard } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
import ManaSymbols from "./ManaSymbols";

type Props = {
  product: InsertMagicCard;
  showBack: boolean;
};

export default function MagicCardsHeader({ product, showBack }: Props) {
  const name = showBack ? product.backName : product.frontName;
  const manaCost = showBack ? product.backManaCost : product.frontManaCost;
  const typeLine = showBack ? product.backTypeLine : product.frontTypeLine;

  return (
    <section className="pb-3">
      <div className="stat-cat">
        <span>
          <h2 className="stat-h2">Card Name</h2>
        </span>
        <span>
          <p className="card-name">{name}</p>
        </span>
      </div>
      <div className="stat-rows">
        <StatRow
          label="Mana Cost"
          value={<ManaSymbols manaCost={manaCost ?? ""} />}
        />
        <StatRow label="Type Line" value={typeLine} />
        <StatRow
          label="Color Identity"
          value={
            product.colorIdentity
              ? JSON.parse(product.colorIdentity).join(", ")
              : ""
          }
        />
      </div>
    </section>
  );
}
