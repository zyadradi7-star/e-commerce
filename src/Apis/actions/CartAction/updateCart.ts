"use server"; // ^ use with non get request  => mutation

import { getTokenFun } from "@/Utilities/getTokenData";

export async function updateCart({
  prodId,
  count,
}: {
  prodId: string;
  count: number;
}) {
  const token = await getTokenFun();
  if (!token) {
    throw new Error("UnAuthorized");
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${prodId}`,
      {
        method: "Put",
        body: JSON.stringify({
          count: count,
        }),

        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) throw new Error("UnAuthorized");

    const payload = await response.json();
    console.log("payload", payload);
    return payload;
  } catch (error) {
    throw new Error("UnAuthorized");
  }
}
