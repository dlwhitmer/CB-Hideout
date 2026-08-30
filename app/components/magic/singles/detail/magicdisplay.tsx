"use client";

import { useState } from "react";
import MagicCardImage from "./magiccardimage";
import MagicCardHeader from "./magiccardheader";
import { MagicSingle } from "../../../../../lib/db/schema/magic_singles";
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
    <div className="image-top">
      {/* IMAGE BLOCK */}
      <div className="display-image">
        <MagicCardImage
          product={product}
          showBack={showBack}
          setShowBack={setShowBack}
        />
      </div>

      <div className="display-stats">
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
