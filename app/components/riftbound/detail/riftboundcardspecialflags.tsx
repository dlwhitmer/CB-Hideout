import { InsertRiftBoundCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";
type Props={
    product:InsertRiftBoundCard
}

export default function RiftBoundCardSpecialFlags({product}:Props){
    const alt=product.alt;
    const sig=product.sig;
    const over =product.over
    const hasSpecial =
    product.alt == 1 ||
    product.sig == 1 ||
    product.over == 1 

    return(
       <section>
        <div className="stat-cat">
           {hasSpecial &&(
            <span>
            <h2 className="stat-h2">Card Special Flags</h2>
            </span>
           )
           }
           
        </div>
        <div className="stat-rows">
            <StatRow label="Alternate Art"
            value={alt === 1 ? "Alternate Art":null}/>
            <StatRow label="Sigature"
            value={sig === 1 ? "Signature":null}/>
            <StatRow label="Overlay"
            value={over === 1 ? "Overlay":null}/>
        </div>
       </section>
    )
};