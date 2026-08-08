"use client";

import { MagicSingle } from "../../../../../lib/db/schema/magic";
import BackButton from "../../../../backButton";

type Props = {
  product: MagicSingle;
  setShowBack: (value: boolean) => void;
};

export default function MagicCardImage({
  product,
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
        // DOUBLE-FACED CARD
        <div
          className="group [perspective:1000px]"
          onMouseEnter={() => setShowBack(true)}
          onMouseLeave={() => setShowBack(false)}
        >
          <div className="scene relative transition-transform duration-500 group-hover:rotate-y-180">

            <img
              src={frontImage}
              alt={product.frontName ?? "Magic card"}
              className="rounded backface-hidden"
            />

            <img
              src={backImage}
              alt="Back face"
              className="absolute inset-0 rounded backface-hidden rotate-y-180"
            />

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