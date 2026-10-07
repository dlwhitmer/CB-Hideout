import { InsertMagicCard } from "../../../../../lib/db/schema";
import { getCardsActiveFace } from "../../../../../lib/magic/cardscardfaces";
import StatRow from "../../../StatRow";

type Props = {
  product: InsertMagicCard;
  showBack: boolean;
};

export default function MagicCardsRules({ product, showBack }: Props) {
  const face = getCardsActiveFace(product, showBack);
  return (
    <section className="pb-3">
      <div className="stat-cat">
        <h2 className="stat-h2">Cards Rules:</h2>
      </div>
      <div>
        <div className="stat-rows">
          <StatRow
            label="Oracle Text"
            value={!showBack ? product.frontOracleText : product.backOracleText}
          />
        </div>
      </div>
    </section>
  );
}
