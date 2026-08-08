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
    <section className="bg-[var(--dpm)] rounded shadow p-4 w-full">
      <div className="text-xl text-center font-extrabold">
        <h2>Card Name:</h2>
        <div className="text-lg font-semibold">{name}</div>
      </div>
      <div className="text-lg grid grid-cols-2 gap-1">
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
