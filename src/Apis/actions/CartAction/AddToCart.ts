"use server"; // ^ use with non get request  => mutation

import { getTokenFun } from "@/Utilities/getTokenData";

export async function addToCart(prodId: string) {
  const token = await getTokenFun();
  if (!token) {
    throw new Error("UnAuthorized");
  }

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v2/cart",
      {
        method: "POST",
        body: JSON.stringify({
          productId: prodId,
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
    console.log("token", token);

    return payload;
  } catch (error) {
    throw new Error("UnAuthorized");
  }
}
