"use client";

import { useEffect, useState } from "react";
import { PokemonSet } from "../../../../lib/db/schema";

export default function PokemonSetsPage() {
  const [sets, setSets] = useState<PokemonSet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/pokemon/sets");
      const json = await res.json();
      setSets(json.data || []);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Pokémon Sets</h1>
      <table>
        <thead>
          <tr>
            <th>Set Name</th>
            <th>Set Code</th>
            <th>Series</th>
            <th>Total Cards</th>
          </tr>
        </thead>

        <tbody>
          {sets.map((s) => (
            <tr key={s.id}>
              <td>{s.setName}</td>
              <td>{s.setCode}</td>
              <td>{s.series}</td>
              <td>{s.totalCards}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
