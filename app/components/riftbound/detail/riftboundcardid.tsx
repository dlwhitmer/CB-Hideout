import { InsertRiftBoundCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
product: InsertRiftBoundCard;
};

export default function RiftBoundCardId({product}:Props){
    const name = product.name;
    const num=product.num;
    const riftId=product.riftboundId;
    const set=product.setName;
    const setcode=product.set;
    const rarity=product.rarity;

    return(
<section>
    <div className="stat-cat">
        <span><h2 className="stat-h2">Card Name</h2></span>
        <span><p className="card-name">{name}</p></span>
    </div>
    <div className="stat-rows">
        <StatRow label="Card Number" value={num}/>
        <StatRow label="Riftbound Id" value={riftId}/>
        <StatRow label="Set Name" value={set}/>
        <StatRow label="Set Code" value={setcode}/>
        <StatRow label="Rarity" value={rarity}/>
    </div>
</section>
    );

}