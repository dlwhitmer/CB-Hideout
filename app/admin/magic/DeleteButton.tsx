"use client";

export default function DeleteButton({ scryfallId }: { scryfallId: string | null }) {
  async function handleDelete() {
    console.log("Sending DELETE to:", `/api/magic/singles/${scryfallId}`);

    await fetch(`/api/magic/singles/${scryfallId}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
     <button
      type="button"
      onClick={handleDelete}
      className=" bg-red-600 hover:bg-red-500 text-white py-1 rounded"
    >
      Delete
    </button>
  );
}