"use client";

import { YugiohPrinting, YugiohSingle } from "../../../../../lib/db/schema";
import YugiohCardImage from "./yugiohcardimage";
import YugiohCardStats from "./yugiocardstats";
import YugiohCardDesctiption from "./yugiohcarddesc";
import YugiohCardHeader from "./yugiohcardheader";
import YugiohCollector from "./yugiohcollector";
import YugiohPrices from "./yugiohcardprices";
import YugiohPurchaseInformation from "./yugiohpurchaseinfo";

type Props = {
  product: YugiohSingle;
  printings: YugiohPrinting[];
};

export default function YugiohDisplay({ product, printings }: Props) {
  return (
    <div className="image-top">
      <div className="display-image">
        <YugiohCardImage product={product} />
      </div>

      <div className=" display-stats">
        <YugiohCardHeader product={product} />
        <YugiohCardStats product={product}/>
        <YugiohCardDesctiption product={product}/>
        <YugiohCollector product={product} printings={printings}/>
        <YugiohPrices product={product}/>
        <YugiohPurchaseInformation product={product}/>
        
      </div>
    </div>
  );
}
