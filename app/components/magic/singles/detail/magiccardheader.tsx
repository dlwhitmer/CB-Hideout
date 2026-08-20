import { MagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";
import ManaSymbols from "./ManaSymbols";
type Props = {
  product: MagicSingle;
  showBack: boolean;
};

export default function MagicCardHeader({ product, showBack }: Props) {
  const name = showBack ? product.backName : product.frontName;
  const manaCost = showBack ? product.backManaCost : product.frontManaCost;
  const typeLine = showBack ? product.backTypeLine : product.frontTypeLine;

  return (
    <section className="stat-section">
      <div className="stat-cat">
        <h2>Card Name:</h2>
        <div className="card-name">{name}</div>
      </div>
      <div className="stat-rows">
        <StatRow
          label="Mana Cost:"
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
