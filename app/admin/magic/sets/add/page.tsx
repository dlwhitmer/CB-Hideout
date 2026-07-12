"use client";

import { integer } from "drizzle-orm/gel-core";
import { useState } from "react";

export default function AddMagicSetPage() {
  const [form, setForm] = useState({
    imageUrl: "",
    setName: "",
    setCode: "",
    totalCards: "",
    quantity: "",
    releaseDate: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/magic/sets", {
      method: "POST",
      body: JSON.stringify(form),
    });

    window.location.href = "/admin/magic/sets";
  }

  return (
    <div>
      <h1>Add Magic Single</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.setName}
          onChange={e => setForm({ ...form, setName: e.target.value })}
        />

        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />

        <input
          placeholder="Total Cards"
          type="integer"
          value={form.totalCards}
          onChange={e => setForm({ ...form, totalCards: integer(e.target.value) })}
        />

        <button type="submit">Add Set</button>
      </form>
    </div>
  );
}
