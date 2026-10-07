import { InsertMagicCard } from "../../../../../lib/db/schema";
import StatRow from "../../../StatRow";

type Props={
  product:InsertMagicCard;
  showBack:boolean;
}

export default function MagicCardsInformation({product,showBack}:Props){
  const toughness = showBack ? product.backToughness : product.frontToughness;
  const power = showBack ? product.backPower : product.frontPower;
  const setname=product.setName;
  const rarity=product.rarity;
  const mv=product.cmc;

  return(
    <section className="pb-3">
      <div className="stat-cat">
      <span><h2 className="stat-h2">Card Information</h2></span>
      </div>
      <div className="stat-rows">
      <StatRow label="Set Name" value={setname}/>
      <StatRow label="Rarity" value={rarity}/>
      <StatRow label="Toughness" value={toughness}/>
      <StatRow label="Power" value={power}/>
      <StatRow label="Mana Value" value={mv}/>
      </div>
    </section>
  )
}