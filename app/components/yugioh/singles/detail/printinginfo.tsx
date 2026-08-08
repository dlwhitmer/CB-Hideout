import StatRow from "../../../StatRow";
import { YugiohPrinting } from "../../../../../lib/db/schema";

type Props = {
  printing: YugiohPrinting;
};

export default function PrintingInformation({ printing }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <h2 className="text-lg underline text-center font-extrabold mb-4">
     Printing Information
      </h2>

      {/* GENERAL */}
      <section className="mb-2">
        <div className="h-8 grid grid-cols-2 ">
          <StatRow label="Set Name" value={printing.setName} />
          <StatRow label="Set Code" value={printing.setCode} />
          <StatRow label="Rarity" value={printing.setRarity} />
          <StatRow label="Card Number" value={printing.cardNumber} />
           <StatRow label="Market Value" value={`$${" "}${printing.marketValue}`} />
        </div>
      </section>
    </section>
  );
}
