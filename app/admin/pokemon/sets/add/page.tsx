"use client";

import { useState } from "react";

export default function AddPokemonPacksPage() {
  const [form, setForm] = useState({
    setCode: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/pokemon/sets/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        setCode: form.setCode,
      }),
    });

    window.location.href = "/admin/pokemon/sets";
  }

  return (
    <div>
      <h1>Import Pokémon Set</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Set Code (example: sv1)"
          value={form.setCode}
          onChange={(e) => setForm({ ...form, setCode: e.target.value })}
        />

        <button type="submit">Import Set</button>
      </form>
    </div>
  );
}
