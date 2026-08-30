"use client";

import { useState } from "react";
import MagicCardImage from "./magiccardimage";
import MagicCardsHeader from "./magiccardsheader";
import { MagicCard } from "../../../../../lib/db/schema/magic_cards";
import MagicCardsRules from "./magiccardsrules";
import MagicCardsInformation from "./magicCardsInformation"
import MagicCardsCollector from "./magiccardscollector";



type Props = {
  product: MagicCard;
};

export default function MagicCardsDisplay({ product }: Props) {
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
        <MagicCardsHeader product={product} showBack={showBack} />
       <MagicCardsRules product={product} showBack={showBack} />
        <MagicCardsInformation product={product} showBack={showBack} />
        <MagicCardsCollector product={product} />
   
 
      </div>
    </div>
  );
}
