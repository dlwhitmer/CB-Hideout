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
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <div className="text-center font-bold">
        <h2 className="text-xl">Card Stats:</h2>
       
      </div>
      <div className="text-lg grid grid-cols-2 gap-1">
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
