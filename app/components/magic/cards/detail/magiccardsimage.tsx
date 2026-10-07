"use client";

import { useState } from "react";
import { InsertMagicCard } from "../../../../../lib/db/schema";
import BackButton from "../../../../backButton";

type Props = {
  product: InsertMagicCard;
};

export default function MagicCardsImage({ product }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);

  const frontImage =
    product.frontImageNormal || product.imageNormal || "/placeholder.png";

  const backImage = product.backImageNormal;

  return (
    <section>
      {/* Back button */}
      <div className="flex justify-center">
        <BackButton />
      </div>

      {/* Normal card view */}
      {!isZoomed && (
        <div className="flex flex-col items-center">
          <img
            src={frontImage}
            alt={product.frontName ?? "Magic card"}
            width={200}
            height={250}
            className="rounded pb-2"
          />

          {/* If double-faced, show a toggle button */}
          {backImage && (
            <button
              onClick={() => setIsZoomed(true)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Enlarge / Flip Card
            </button>
          )}

          {/* If single-faced, just enlarge */}
          {!backImage && (
            <button
              onClick={() => setIsZoomed(true)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Enlarge Card
            </button>
          )}
        </div>
      )}

      {/* Zoomed card */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/70 overflow-auto">
          {/* Close button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="fixed top-4 right-4 px-3 py-1 bg-red-600 text-white rounded z-[60]"
          >
            Close
          </button>

          {/* Side-by-side card images */}
          <div className="flex justify-center py-10 gap-10">
            {/* FRONT */}
            <img
              src={frontImage}
              alt={product.frontName ?? "Magic card"}
              width="400"
              height="600"
              className="rounded pointer-events-none"
            />

            {/* BACK (only if double-faced) */}
            {backImage && (
              <img
                src={backImage}
                alt="Back face"
                width="400"
                height="600"
                className="rounded pointer-events-none"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
