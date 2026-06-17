"use client";

export default function DeleteButton({ pokemonId }: { pokemonId: string | null }) {
  async function handleDelete() {
    console.log("Sending DELETE to:", `/api/pokemon/${pokemonId}`);

    await fetch(`/api/pokemon/${pokemonId}`, {
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