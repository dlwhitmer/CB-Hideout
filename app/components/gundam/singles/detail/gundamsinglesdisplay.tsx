"use client";

import { InsertGundamSingle } from "../../../../../lib/db/schema";
import GundamSinglesImage from "./gundamsingleimage";
import GundamSinglesHeader from "./gundamsinglesheader";
import GundamSinglesDetails from "./gundamsinglesdetails";
import GundamSinglesStats from "./gundamsinglesstats";


type Props = {
  product: InsertGundamSingle;
};

export default function GundamSinglesDisplay({ product }: Props) {

  return (
    <div className="image-top">
      <div className="display-image">
        <GundamSinglesImage product={product} />
      </div>

      <div className=" display-stats">
      <GundamSinglesHeader product={product}/>
      <GundamSinglesStats product={product}/>
      <GundamSinglesDetails product={product}/>
      </div>
    </div>
  );
}
