"use client";

export default function DeleteButton({ yugiohId }: { yugiohId: string | null }) {
  async function handleDelete() {
    console.log("Sending DELETE to:", `/api/yugioh/${yugiohId}`);

    await fetch(`/api/yugioh/${yugiohId}`, {
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