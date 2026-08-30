"use client";

export default function DeleteButton({ id }: { id: string | number | null }) {
  async function handleDelete() {
    console.log("Sending DELETE to:", `/api/yugioh/singles${id}`);

    await fetch(`/api/yugioh/singles${id}`, {
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