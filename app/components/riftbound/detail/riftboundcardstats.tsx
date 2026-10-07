import { InsertRiftBoundCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
  product: InsertRiftBoundCard;
};
export default function RiftBoundCardStats({ product }: Props) {
  const energy = product.energy;
  const might = product.might;
  const power = product.power;
  const type = product.type;
  const suptype = product.supertype;
  const dom = product.domains;

  return (
    <section>
      <div className="stat-cat">
        <span>
          <h2 className="stat-h2">Card Stats</h2>
        </span>
      </div>
      <div className="stat-rows">
        <StatRow label="Engery" value={energy} />
        <StatRow label="Might" value={might} />
        <StatRow label="Power" value={power} />
        <StatRow label="Type" value={type} />
        <StatRow label="Supertype" value={suptype} />
        <StatRow label="Domains" value={dom} />
      </div>
    </section>
  );
}
