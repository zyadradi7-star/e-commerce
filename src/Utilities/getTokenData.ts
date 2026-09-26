// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function getTokenFun() {
//   const cookie = await cookies();

//   const nextAuthToken = cookie.get("next-auth.session-token")?.value;

//   const accessToken = await decode({
//     secret: process.env.NEXTAUTH_SECRET!,
//     token: nextAuthToken,
//   });
//   return accessToken?.accessToken;
// }

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFun() {
  const cookieStore = await cookies();

  // فحص الكوكي في بيئة التطوير (http) وبناء الإنتاج (https)
  const nextAuthToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!nextAuthToken) return null;

  try {
    const accessToken = await decode({
      secret: process.env.NEXTAUTH_SECRET!,
      token: nextAuthToken,
    });

    return (accessToken?.accessToken as string) || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
