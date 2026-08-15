import { MagicSingle } from "../../../../../lib/db/schema";
import { getActiveFace } from "../../../../../lib/magic/cardfaces";
import StatRow from "../../../StatRow";

type Props = {
  product: MagicSingle;
  showBack: boolean;
};

export default function MagicCardRules({ product, showBack }: Props) {
  const face = getActiveFace(product, showBack);
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4 w-full">
      <h2 className="text-[13px] sm:text-[13px] md:text-[16px] lg:text-[18px]underline text-center font-extrabold mb-2">
        Card Rules:
      </h2>
      {!showBack ? (
        <div className="text-[13px] sm:text-[13px] md:text-[16px] lg:text-[18px] grid grid-cols-1 gap-1">
          <StatRow label="" value={product.frontOracleText} align="center" />
        </div>
      ) : (
        <div className="text-[13px] sm:text-[13px] md:text-[16px] lg:text-[18px] grid grid-cols-1 gap-1">
          <StatRow label="" value={product.backOracleText} align="center" />
        </div>
      )}
    </section>
  );
}
