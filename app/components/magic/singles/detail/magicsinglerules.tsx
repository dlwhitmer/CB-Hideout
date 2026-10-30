import { InsertMagicSingle } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props={
    product: InsertMagicSingle
    showBack: boolean
};

export default function MagicSingleRules({product,showBack}:Props){
    return(
        <section className="pb-3">
            <div className="stat-cat">
                <h2 className="stat-h2">Card Rules</h2>
            </div>
            <div className="stat-rows">
                <StatRow
            label="Oracle Text"
            value={!showBack ? product.frontOracleText : product.backOracleText}
          />
            </div>
        </section>
    );
}