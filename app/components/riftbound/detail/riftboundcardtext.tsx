import { InsertRiftBoundCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props={
    product: InsertRiftBoundCard
}
export default function RiftBoundCardText({product}: Props){
    const rtext=product.text;
    const flatext=product.flavour;
    return(
   <section>
       <div className="stat-cat">
           <span><h2 className="stat-h2">Card Text</h2></span>
       </div>
       <div className="stat-rows">
           <StatRow label="Rules Text" value={rtext}/>
           <StatRow label="Flavor Text" value={flatext}/>
       </div>
   </section>
       );
}