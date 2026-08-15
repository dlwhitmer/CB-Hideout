"use client";

import { MagicSingle } from "../../../../../lib/db/schema/magic";
import BackButton from "../../../../backButton";

type Props = {
  product: MagicSingle;
  showBack: boolean;
  setShowBack: (value: boolean) => void;
};

export default function MagicCardImage({
  product,
  showBack,
  setShowBack,
}: Props) {
  const frontImage =
    product.frontImageNormal || product.imageNormal || "/placeholder.png";

  const backImage = product.backImageNormal;

  return (
    <section className="bg-transparent rounded shadow">
      <div className="flex justify-center">
        <BackButton />
      </div>

      {backImage ? (
        <div className="w-40 sm:w-148 md:w-64 lg:w-72">
          <div className="relative group">
            <div
              className="[perspective:1000px]"
              onClick={() => setShowBack(!showBack)}
            >
              <div
                className={`
            relative transition-transform duration-500
            [transform-style:preserve-3d]
            ${showBack ? "rotate-y-180" : ""}
          `}
              >
                <img
                  src={frontImage}
                  alt={product.frontName ?? "Magic card"}
                  className="w-full h-auto rounded backface-hidden"
                />

                <img
                  src={backImage}
                  alt="Back face"
                  className="absolute inset-0 w-full h-auto rounded backface-hidden rotate-y-180"
                />
              </div>
            </div>

            {/* Tooltip BELOW the card */}
            <div
              className="
        absolute left-1/2 translate-x-[-50%] 
        top-full mt-2
        bg-black text-white text-xl px-2 py-1 rounded
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        pointer-events-none
      "
            >
              Click to turn
            </div>
          </div>
        </div>
      ) : (
        // SINGLE-FACED CARD
        <img
          src={frontImage}
          alt={product.frontName ?? "Magic card"}
          className="rounded"
        />
      )}
    </section>
  );
}
