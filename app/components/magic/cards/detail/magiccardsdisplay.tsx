"use client";

import { useState } from "react";

import MagicCardsImage from "../../cards/detail/magiccardsimage";
import MagicCardsHeader from "./magiccardsheader";
import { InsertMagicCard } from "../../../../../lib/db/schema";
import MagicCardsRules from "./magiccardsrules";
import MagicCardsInformation from "./magicCardsInformation";
import MagicCardsCollector from "./magiccardscollector";

type Props = {
  product: InsertMagicCard;
  showBack:boolean
  setShowBack: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MagicCardsDisplay({ product }: Props) {

  const [showBack, setShowBack] = useState(false);

  return (
    <div className="image-top">
      <div className="display-image">
        <MagicCardsImage
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
