"use client";

import { InsertGundamCard } from "../../../../lib/db/schema";
import GundamCardsImage from "./gundamcardimage";
import GundamCardHeader from "./gundamcardheader";
import GundamCardStats from "./gundamcardstats";
import GundamCardDetails from "./gundamcarddetails";


type Props = {
  product: InsertGundamCard;
};

export default function GundamCardsDisplay({ product }: Props) {

  return (
    <div className="image-top">
      <div className="display-image">
        <GundamCardsImage product={product} />
      </div>

      <div className=" display-stats">
      <GundamCardHeader product={product}/>
      <GundamCardStats product={product}/>
      <GundamCardDetails product={product}/>
      </div>
    </div>
  );
}
