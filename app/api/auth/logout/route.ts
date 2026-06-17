import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  await cookieStore.set("userId", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
    maxAge: 0, // delete cookie
  });

  return Response.json({ success: true });
}
