"use client";

import { InsertLorcanaSingle } from "../../../../../lib/db/schema";
import LorcanaSinglesImage from "./lorcanasinglesimage";
import LorcanaSinglesHeader from "./lorcanasinglesheader";
import LorcanaSinglesStats from "./lorcanasinglesstats";
import LorcanaSinglesCharStats from "./lorcanasinglescharstats";
import LorcanaSinglesLocationStats from "./lorcanasingleslocationstats";
import LorcanaSinglesText from "./lorcanasinglestext";

type Props = {
  product: InsertLorcanaSingle;
};

export default function LorcanaSinglesDisplayPage({ product }: Props) {
 
  return (
    <div className="image-top">
      <div className="display-image">
        <LorcanaSinglesImage product={product} />
      </div>

      <div className=" display-stats">
        <LorcanaSinglesHeader product={product} />
        <LorcanaSinglesStats product={product}/>
        <LorcanaSinglesCharStats product={product}/>
        <LorcanaSinglesLocationStats product={product}/>
        <LorcanaSinglesText product={product}/>
      </div>
    </div>
  );
}
