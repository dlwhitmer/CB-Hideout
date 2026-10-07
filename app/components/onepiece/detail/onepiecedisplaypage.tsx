"use client";

import { InsertOnePieceCard } from "../../../../lib/db/schema";
import OnePieceCardText from "./onepiececardtext";
import OnePieceHeader from "./onepieceheader";
import OnePieceCardsImage from "./onepieceimagepage";
import OnePieceStats from "./onepiecestats";

type Props = {
  product: InsertOnePieceCard;
};

export default function OnePieceCardDisplay({ product }: Props) {
  return (
    <div className="image-top">
      <div className="display-image">
        <OnePieceCardsImage product={product} />
      </div>

      <div className=" display-stats">
        <OnePieceHeader product={product}/>
        <OnePieceStats product={product}/>
        <OnePieceCardText product={product}/>
      </div>
    </div>
  );
}
