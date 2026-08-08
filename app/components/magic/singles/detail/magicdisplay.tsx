"use client";

import { useState } from "react";
import MagicCardImage from "./magiccardimage";
import MagicCardHeader from "./magiccardheader";
import { MagicSingle } from "../../../../../lib/db/schema/magic";
import MagicCardCollector from "./magiccardcollector";
import MagicCardRules from "./magicCardRules";
import MagicCardPrices from "./magiccardprices";
import MagicCardInformation from "./magiccardinfo";
import MagicPurchaseInfo from "./magicpurchaseinfo";
type Props = {
  product: MagicSingle;
};

export default function MagicDisplay({ product }: Props) {
  const [showBack, setShowBack] = useState(false);

  return (
    <div className="flex gap-8 items-start justify-center">
      <div className="w-[320px] sticky top-[125px] self-start">
        <MagicCardImage product={product} setShowBack={setShowBack} />
      </div>

      <div className=" w-[800px] rounded shadow p-4">
        <MagicCardHeader product={product} showBack={showBack} />
        <MagicCardRules product={product} showBack={showBack} />
        <MagicCardInformation product={product} showBack={showBack} />
        <MagicCardCollector product={product} />
        <MagicCardPrices product={product} />
        <MagicPurchaseInfo product={product}/>
      </div>
    </div>
  );
}
