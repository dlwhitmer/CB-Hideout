"use client";

import { useEffect, useState } from "react";
import { MagicPack } from "../../../../../lib/db/schema";

export default function MagicPackDetail({ params }: { params: { id: string } }) {
  const [card, setCard] = useState<MagicPack | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/magic/singles/${params.id}`);
      const json = await res.json();
      setCard(json.data);
    }
    load();
  }, [params.id]);

  if (!card) return <div>Loading...</div>;

  return (
  <div>
    <h1>{card.packName}</h1>

    <p>Set Code: {card.setCode}</p>
    <p>Price: ${card.price}</p>
    <p>Quantity: {card.quantity}</p>

    {card.imageUrl && (
      <img
        src={card.imageUrl}
        alt={card.packName}
        style={{ width: "200px", marginTop: "1rem" }}
      />
    )}

    <a href={`/admin/magic/packs/${card.id}/edit`}>Edit</a>
  </div>
);
}
