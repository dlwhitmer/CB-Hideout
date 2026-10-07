"use client";

import { InsertLorcanaCard } from "../../../../lib/db/schema";
import LorcanaCardsImage from "./lorcanacardimage";
import LorcanaCardHeader from "./lorcanacardheader";
import LorcanaCardStats from "./lorcanacardstats";
import LorcanaCharacterStats from "./lorcanacharacterstats";
import LorcanaLocationStats from "./lorcanalocationstats";
import LorcanaCardText from "./lorcanacardtext";

type Props = {
  product: InsertLorcanaCard;
};

export default function LorcanaCardDisplayPage({ product }: Props) {
 
  return (
    <div className="image-top">
      <div className="display-image">
        <LorcanaCardsImage product={product} />
        <LorcanaCardHeader product={product} />
        <LorcanaCardStats product={product}/>
        <LorcanaCharacterStats product={product}/>
        <LorcanaLocationStats product={product}/>
        <LorcanaCardText product={product}/>
      </div>

      <div className=" display-stats">
        
      </div>
    </div>
  );
}
