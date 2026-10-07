"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { PokemonSingle } from "../../../../../lib/db/schema/pokemon_singles";

export default function PokemonSingleDetail() {
  const { id } = useParams(); // ⭐ FIXED
  const [card, setCard] = useState<PokemonSingle | null>(null);

  useEffect(() => {
    if (!id) return; // ⭐ PREVENT undefined fetch
    console.log("EDIT PAGE PARAM ID:", id);

    async function load() {
      const res = await fetch(`/api/pokemon/singles/${id}`); // ⭐ FIXED
      const json = await res.json();
      setCard(json.data);
    }

    load();
  }, [id]); // ⭐ FIXED

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
