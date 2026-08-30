import { MagicCard } from "../../../../../lib/db/schema";
import { getCardsActiveFace } from "../../../../../lib/magic/cardscardfaces"; 
import StatRow from "../../../StatRow";

type Props = {
  product: MagicCard;
  showBack: boolean;
};

export default function MagicCardsRules({ product, showBack }: Props) {
  const face = getCardsActiveFace(product, showBack);
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Cards Rules:
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
