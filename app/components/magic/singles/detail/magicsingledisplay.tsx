"use client";

import { useState } from "react";
import MagicSinglesImage from "./magicsinglesimage";
import { InsertMagicPrice, InsertMagicSingle } from "../../../../../lib/db/schema";
import MagicSingleHeader from "./magicsingleheader";
import MagicSingleRules from "./magicsinglerules";
import MagicSingleInfo from "./magicsingleinformation";
import MagicSingleCollector from "./magicsinglecollectors";
import MagicSinglePrices from "./magicsingleprices";
type Props = {
  product: InsertMagicSingle;
  price: InsertMagicPrice
  // showBack:boolean
  // setShowBack: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MagicSinglesDisplay({ product, price }: Props) {

  const [showBack, setShowBack] = useState(false);

  return (
    <div className="image-top">
      <div className="display-image">
        <MagicSinglesImage
          product={product}
          showBack={showBack}
          setShowBack={setShowBack}
        />
      </div>

      <div className="display-stats">
        <MagicSingleHeader product={product} showBack={showBack}/>
        <MagicSingleRules product={product} showBack={showBack}/>
        <MagicSingleInfo product={product} showBack={showBack}/>
        <MagicSingleCollector product={product}/>
        <MagicSinglePrices price={price} product={product}/>

      </div>
    </div>
  );
}
