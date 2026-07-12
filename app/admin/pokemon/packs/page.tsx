"use client";

import { useEffect, useState } from "react";
import { PokemonPack } from "../../../../lib/db/schema";

export default function PokemonPacksPage() {
  const [packs, setPacks] = useState<PokemonPack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/pokemon/packs");
      const json = await res.json();
      setPacks(json.data || []);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Pokémon Packs</h1>

      <table>
        <thead>
          <tr>
            <th>Pack Name</th>
            <th>Set Code</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>

        <tbody>
          {packs.map((p) => (
            <tr key={p.id}>
              <td>{p.packName}</td>
              <td>{p.setCode}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
