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
    <div className="flex flex-col items-center">
      {/* IMAGE BLOCK */}
      <div className="w-[150px] sm:w-[150px] lg:w-[300px]">
        <MagicCardImage
          product={product}
          showBack={showBack}
          setShowBack={setShowBack}
        />
      </div>

      <div className="w-[400px] sm:w-[400px] lg:w-[1200px] rounded shadow p-4">
        <MagicCardHeader product={product} showBack={showBack} />
        <MagicCardRules product={product} showBack={showBack} />
        <MagicCardInformation product={product} showBack={showBack} />
        <MagicCardCollector product={product} />
        <MagicCardPrices product={product} />
        <MagicPurchaseInfo product={product} />
      </div>
    </div>
  );
}
