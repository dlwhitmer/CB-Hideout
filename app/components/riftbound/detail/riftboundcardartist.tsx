import { InsertRiftBoundCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props={
    product: InsertRiftBoundCard
}
export default function RiftBoundCardArtist({product}: Props){
  const art=product.artist;
    return(
   <section>
       <div className="stat-cat">
           <span><h2 className="stat-h2">Card Artist</h2></span>

       </div>
       <div className="stat-rows">
           <StatRow label="Artist" value={art}/>
  
       </div>
   </section>
       );
}