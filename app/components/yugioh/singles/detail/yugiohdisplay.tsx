"use client";

import { YugiohPrinting, YugiohSingle } from "../../../../../lib/db/schema";
import CardImage from "./cardimage";
import YugiohCardStats from "./yugiocardstats";
import YugiohCardHeader from "./yugiohcardheader";


type Props = {
  product: YugiohSingle;
  printing: YugiohPrinting

};

export default function YugiohDisplay({ product, printing }: Props) {
  return (
    <div className="flex gap-8 items-start justify-center">
      <div className="w-[320px] sticky top-[125px] self-start">
        <CardImage product={product} />
      </div>

      <div className=" w-[800px] rounded shadow p-4">
        <YugiohCardHeader product={product} />
        <YugiohCardStats product={product}/>
        
      </div>
    </div>
  );
}
