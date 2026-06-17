import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {/* Your cart UI goes here */}
    </div>
  );
}
