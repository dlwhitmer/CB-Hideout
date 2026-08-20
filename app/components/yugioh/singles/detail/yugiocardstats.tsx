import StatRow from "../../../StatRow";

type Props = {
  product: any;
};

function getLevelLabel(type: string | null) {
  if (type?.includes("XYZ")) return "Rank";
  if (type?.includes("Link")) return "Link Rating";
  return "Level";
}

export default function YugiohCardHeader({ product }: Props) {
  const type = product.type?.toLowerCase() ?? "";

  const isMonster = type.includes("monster");
  const isSpell = type.includes("spell");
  const isTrap = type.includes("trap");

  return (
    <section className="stat-section">
      <div>
        <h2 className="stat-cat">Card Stats:</h2>
       
      </div>
      <div className="stat-rows">
        {isMonster && (
          <>
            <StatRow label="Pendulum Scale" value={product.scale} />
            <StatRow label="Value" value={product.level} />
            <StatRow label="Attribute" value={product.attribute} />
            <StatRow label="Type" value={product.type} />
            <StatRow label="ATK" value={product.atk} />
            <StatRow label="DEF" value={product.def} />
          </>
        )}
      </div>
    </section>
  );
}
