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

  const levelLabel = () => {
    if (type.includes("xyz")) return "Rank";
    if (type.includes("link")) return "Link Rating";
    return "Level";
  };

  return (
    <section className="stat-section">
      <div className="text-center font-bold">
        <h2 className="stat-cat">Card Name:</h2>
        <p className="card-name ">{product.name}</p>
      </div>
      <div className="stat-rows">
        <StatRow label="Card Type" value={product.humanReadableCardType} />
        {isMonster && (
          <>
            <StatRow label="Attribute" value={product.attribute} />

            <StatRow label={levelLabel()} value={product.level} />

            <StatRow label="Race" value={product.race} />

            <StatRow label="Type Line" value={product.typeline} />

            <StatRow label="ATK" value={product.atk} />

            <StatRow label="DEF" value={product.def} />
          </>
        )}
        {(isSpell || isTrap) && (
          <StatRow label="Property" value={product.humanReadableCardType} />
        )}
      </div>
    </section>
  );
}
