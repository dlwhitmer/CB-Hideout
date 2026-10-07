"use client";

// import { integer } from "drizzle-orm/gel-core";
import { useState } from "react";

export default function AddRiftBoundSetPage() {
  const [form, setForm] = useState({
    setName: "",
    setCode: "",
    cardCount: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/riftbound/sets", {
      method: "POST",
      body: JSON.stringify(form),
    });

    window.location.href = "/admin/riftbound/sets";
  }

  return (
    <div>
      <h1>Add RiftBound Card</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.setName}
          onChange={(e) => setForm({ ...form, setName: e.target.value })}
        />

        {/* <input
          placeholder="Total Cards"
          type="integer"
          value={form.totalCards}
          onChange={e => setForm({ ...form, totalCards: integer(e.target.value) })}
        /> */}

        <button type="submit">Add Set</button>
      </form>
    </div>
  );
}
