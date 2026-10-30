"use client";

import { InsertRiftBoundSingle } from "../../../../../lib/db/schema";
import RiftBoundSinglesArtist from "./riftboundsinglesartist";
import RiftBoundSinglesClassification from "./riftboundsinglesclassificaion";
import RiftBoundSinglesId from "./riftboundsinglesid";
import RiftBoundSinglesImage from "./riftboundsingleimage";
import RiftBoundSinglesSpecialFlags from "./riftboundsinglesspecialflags";
import RiftBoundSinglesStats from "./riftboundsinglestats";
import RiftBoundSinglesText from "./riftboundsinglestext";


type Props = {
  product: InsertRiftBoundSingle;
};

export default function RiftBoundSinglesDisplayPage({ product }: Props) {
 
  return (
    <div className="image-top">
      <div className="display-image">
       <RiftBoundSinglesImage product={product}/>
      </div>

      <div className=" display-stats">
        <RiftBoundSinglesId product={product}/>
        <RiftBoundSinglesStats product={product}/>
        <RiftBoundSinglesText product={product}/>
        <RiftBoundSinglesClassification product={product}/>
        <RiftBoundSinglesArtist product={product}/>
        <RiftBoundSinglesSpecialFlags product={product}/>
      </div>
    </div>
  );
}
