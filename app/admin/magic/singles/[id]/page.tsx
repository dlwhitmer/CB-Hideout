"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { MagicSingle } from "../../../../../lib/db/schema/magic";

export default function MagicSingleDetail() {
  const { id } = useParams();            // ⭐ FIXED
  const [card, setCard] = useState<MagicSingle | null>(null);

  useEffect(() => {
    if (!id) return;                     // ⭐ PREVENT undefined fetch

    async function load() {
      const res = await fetch(`/api/magic/singles/${id}`);   // ⭐ FIXED
      const json = await res.json();
      setCard(json.data);
    }

    load();
  }, [id]);                              // ⭐ FIXED

  if (!id) return <div>Loading ID...</div>;
  if (!card) return <div>Loading card...</div>;

  return (
    <div>
      <h1>{card.name}</h1>
      <p>Set: {card.setName}</p>
      <p>Rarity: {card.rarity}</p>
      <p>Price: ${card.price}</p>
      <img src={card.imageSmall || "/placeholder.png"} alt={card.name} />
    </div>
  );
}
