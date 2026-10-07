"use client";

import { useState } from "react";
import { InsertRiftBoundCard } from "../../../../lib/db/schema";
import BackButton from "../../../backButton";


type Props = {
  product: InsertRiftBoundCard;
};

export default function RiftBoundCardsImage({ product }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section>
      {/* Back button stays exactly where you had it */}
      <div className="flex justify-center">
        <BackButton />
      </div>

      {/* Normal card */}
      {!isZoomed && (
        <div className="flex flex-col items-center">
          <img
            src={product.imgUrl}
            alt={product.name}
            width={200}
            height={250}
            className="rounded pb-2"
          />
          <button
            onClick={() => setIsZoomed(true)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Enlarge Card
          </button>
        </div>

      )}

      {/* Zoomed card in a scrollable container */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/70 overflow-auto">
          {/* Close button stays fixed so it NEVER gets covered */}
          <button
            onClick={() => setIsZoomed(false)}
            className="fixed top-4 right-4 px-3 py-1 bg-red-600 text-white rounded z-[60]"
          >
            Close
          </button>

          {/* Scrollable zoom area */}
          <div className="flex justify-center py-10">
            <img
              src={product.imgUrl}
              alt={product.name}
              width={400}     // ← enlarge as much as you want
              height={900}   // ← scroll will handle the rest
              className="rounded pointer-events-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}
