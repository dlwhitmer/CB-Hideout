"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MagicSingle } from "../../../../lib/db/schema";

export default function MagicSinglesPage() {
  const [cards, setCards] = useState<MagicSingle[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/magic/singles");
      const json = await res.json();
      setCards(json.data);
    }
    load();
  }, []);

  return (
    <div>
      <h1>Magic Singles</h1>

      <Link href="/admin/magic/singles/add" className="btn">
        Add New Card
      </Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Set</th>
            <th>Rarity</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{card.name}</td>
              <td>{card.setName}</td>
              <td>{card.rarity}</td>
              <td>${card.price}</td>
              <td>
                <Link href={`/admin/magic/singles/${card.id}`}>View</Link>
                {" | "}
                <Link href={`/admin/magic/singles/${card.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
