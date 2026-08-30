"use client";

import { useState } from "react";
import { MagicCard } from "../../../../../lib/db/schema/magic_cards";
import BackButton from "../../../../backButton";

type Props = {
  product: MagicCard;
  showBack: boolean;
  setShowBack: (value: boolean) => void;
};

export default function MagicCardsImage({
  product,
  showBack,
  setShowBack,
}: Props) {
  const frontImage =
    product.frontImageNormal || product.imageNormal || "/placeholder.png";

  const backImage = product.backImageNormal;
  const [showTurnHint, setShowTurnHint] = useState(true);

  return (
    <section className="bg-transparent rounded shadow">
      <div className="relative z-50 flex justify-center pointer-events-auto">
        <BackButton />
      </div>

      {backImage ? (
        // MULTI-FACED CARD
        <div className="w-40 sm:w-148 md:w-64 lg:w-72">
          <div className="relative group">
            <div
              className="[perspective:1000px]"
              onClick={() => {
                setShowBack(!showBack);
                setShowTurnHint(false);
              }}
            >
              <div
                className={`
                relative transition-all duration-300
                hover:pt-20 hover:pb-20 hover:scale-150
                [transform-style:preserve-3d]
                ${showBack ? "rotate-y-180 hover:translate-y-38" : ""}
              `}
              >
                <img
                  src={frontImage}
                  alt={product.frontName ?? "Magic card"}
                  className="w-full h-auto rounded backface-hidden pointer-events-none"
                />

                <img
                  src={backImage}
                  alt="Back face"
                  className="absolute inset-0 w-full h-auto rounded backface-hidden rotate-y-180 pointer-events-none"
                />
              </div>
            </div>

            {/* Tooltip BELOW the card */}
            <div
              className={`
                absolute left-1/2 -translate-x-1/2
                top-full mt-2
                bg-black text-center w-[150px]
                text-[#39FF14] text-xl px-2 py-1 rounded
                transition-opacity duration-300
                pointer-events-none
                lg:opacity-0 lg:group-hover:opacity-100
                ${showTurnHint ? "opacity-100" : "opacity-0"}
              `}
            >
              <span className="lg:hidden">Tap to turn</span>
              <span className="hidden lg:inline">Click to turn</span>
            </div>
          </div>
        </div>
      ) : (
        // SINGLE-FACED CARD
        <div className="relative hover:pt-23 hover:pb-23 hover:scale-150 transition-all duration-300">
          <img
            src={frontImage}
            alt={product.frontName ?? "Magic card"}
            className="w-full h-auto rounded"
          />
        </div>
      )}
    </section>
  );
}
