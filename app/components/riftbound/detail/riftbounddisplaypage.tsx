"use client";

import { InsertRiftBoundCard } from "../../../../lib/db/schema";
import RiftBoundCardArtist from "./riftboundcardartist";
import RiftBoundCardClassification from "./riftboundcardclassification";
import RiftBoundCardId from "./riftboundcardid";
import RiftBoundCardsImage from "./riftboundcardimage";
import RiftBoundCardSpecialFlags from "./riftboundcardspecialflags";
import RiftBoundCardStats from "./riftboundcardstats";
import RiftBoundCardText from "./riftboundcardtext";


type Props = {
  product: InsertRiftBoundCard;
};

export default function RiftBoundCardDisplayPage({ product }: Props) {
 
  return (
    <div className="image-top">
      <div className="display-image">
       <RiftBoundCardsImage product={product}/>
      </div>

      <div className=" display-stats">
        <RiftBoundCardId product={product}/>
        <RiftBoundCardStats product={product}/>
        <RiftBoundCardText product={product}/>
        <RiftBoundCardClassification product={product}/>
        <RiftBoundCardArtist product={product}/>
        <RiftBoundCardSpecialFlags product={product}/>
      </div>
    </div>
  );
}
