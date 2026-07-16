"use client";

export default function DeleteButton({ pokemon_id}: { pokemon_id: string | null }) {
  async function handleDelete() {
    console.log("Sending DELETE to:", `/api/magic/singles${pokemon_id}`);

    await fetch(`/api/magic/singles${pokemon_id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="w-full bg-red-600 hover:bg-red-500 text-white py-1 rounded"
    >
      Delete
    </button>
  );
}