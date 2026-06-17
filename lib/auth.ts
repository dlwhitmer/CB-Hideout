import { cookies } from "next/headers";

export async function getUserId() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("userId");
  return cookie ? cookie.value : null;
}
