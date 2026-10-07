import { InsertRiftBoundCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props={
    product: InsertRiftBoundCard
}
export default function RiftBoundCardClassification({product}: Props){
    const tags = product.tags;
    const suptype= product.supertype;
    const type=product.type;
    const dom =product.domains;
    return(
   <section>
       <div className="stat-cat">
           <span><h2 className="stat-h2">Card Classification</h2></span>
       </div>
       <div className="stat-rows">
           <StatRow label="Tags" value={tags}/>
           <StatRow label="Supertype" value={suptype}/>
           <StatRow label="Type" value={type}/>
           <StatRow label="Domain" value={dom}/>
       </div>
   </section>
       );
}