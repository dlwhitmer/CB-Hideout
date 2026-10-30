"use client";

import { InsertOnePieceSingle } from "../../../../../lib/db/schema";
import OnePieceCardText from "./onepiecesinglestext";
import OnePieceHeader from "./onepieceheader";
import OnePieceSinglesImage from "./onepieceimagepage";
import OnePieceStats from "./onepiecestats";

type Props = {
  product: InsertOnePieceSingle;
};

export default function OnePieceSinglesDisplay({ product }: Props) {
  return (
    <div className="image-top">
      <div className="display-image">
        <OnePieceSinglesImage product={product} />
      </div>

      <div className=" display-stats">
        <OnePieceHeader product={product}/>
        <OnePieceStats product={product}/>
        <OnePieceCardText product={product}/>
      </div>
    </div>
  );
}
