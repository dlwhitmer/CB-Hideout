"use client"
import { InsertLorcanaSingle } from "../../../../../lib/db/schema"
import StatRow from "../../../StatRow"

type Props = {
  product: InsertLorcanaSingle;
};

export default function LorcanaSinglesCharStats({product}:Props){
const strength = product.Strength;
const will=product.Willpower;
const lore=product.Lore;
return(
<section>
    <div className="stat-cat">
    <h2 className="stat-h2">Character Stats</h2>
    </div>
    <div className="stat-rows">
    <StatRow label="Strength" value={strength}/>
    <StatRow label="Willpower" value={will}/>
    <StatRow label="Lore" value={lore}/>
    </div>
</section>
)}