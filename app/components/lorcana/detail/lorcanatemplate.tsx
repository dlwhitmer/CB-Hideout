"use client"
import { InsertLorcanaCard } from "../../../../lib/db/schema"
import StatRow from "../../StatRow"

type Props = {
  product: InsertLorcanaCard;
};

export default function Template({product}:Props){
const name = product.Name;
return(
<section>
    <div className="stat-cat">
    <h2 className="stat-h2">Card Name</h2>
    </div>
    <span><p className="card-name">{name}</p></span>
    <div className="w-150 mx-auto pr-2 pl-2 bg-[#1b4552b3]">

    </div>
</section>
)}