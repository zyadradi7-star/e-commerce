"use server"; // ^ use with non get request  => mutation

import { shippingData } from "@/app/checkout/checKoutComp";
import { getTokenFun } from "@/Utilities/getTokenData";

export async function payCash(cartId: string, shippingAddress: shippingData) {
  const token = await getTokenFun();
  if (!token) {
    throw new Error("UnAuthorized");
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
      {
        method: "POST",
        shippingAddress: shippingAddress,
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) throw new Error("UnAuthorized");

    const payload = await response.json();
    console.log("payCashDatadsa......", payload);

    return payload;
  } catch (error) {
    throw new Error("UnAuthorized");
  }
}
