import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CartClient from "./CartClient";

export default async function CartPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/login");
  }

  return <CartClient userId={userId} />;
}
