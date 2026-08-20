import StatRow from "../../../StatRow";
import { YugiohPrinting } from "../../../../../lib/db/schema";

type Props = {
  product: any;
  printings: YugiohPrinting[];
};

function getLevelLabel(type: string | null) {
  if (type?.includes("XYZ")) return "Rank";
  if (type?.includes("Link")) return "Link Rating";
  return "Level";
}

export default function YugiohCollector({ product, printings }: Props) {
  const type = product.type?.toLowerCase() ?? "";

  return (
    <section className="stat-section">
      <div className="text-center font-bold">
        <h2 className="stat-cat">Collector Stats:</h2>
      </div>

      <div className="stat-rows">
        <StatRow label="Attribute" value={product.attribute} />
        <StatRow label="Type" value={product.type} />
        <StatRow label="ATK" value={product.atk} />
        <StatRow label="DEF" value={product.def} />
      </div>

      <div className="mt-4">
        <h3 className="stat-cat ">Printings:</h3>

        <div className="flex flex-col lg:flex-row justify-center gap-2">
          {printings.map((printing) => (
            <div
              key={printing.id}
              className="w-[100%] sm:w-[100%] md:w-[50%]  lg:w-[30%] mx-auto rounded bg-[#ffffffb3] p-2"
            >
              <div>
                <span className="font-semibold">Set Name:</span>{" "}
                {printing.setName}
              </div>
              <div>
                <span className="font-semibold">Set Code:</span>{" "}
                {printing.setCode}
              </div>
              <div>
                <span className="font-semibold">Rarity:</span>{" "}
                {printing.setRarity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
