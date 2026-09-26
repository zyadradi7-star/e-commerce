"use server"; // ^ use with non get request  => mutation

import { getTokenFun } from "@/Utilities/getTokenData";

export async function deleteAddress(addressId: string) {
  const token = await getTokenFun();
  if (!token) {
    throw new Error("UnAuthorized");
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      {
        method: "DELETE",

        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) throw new Error("UnAuthorized");

    const payload = await response.json();
    console.log("delete Address Data....", payload);
    return payload;
  } catch (error) {
    throw new Error("UnAuthorized");
  }
}
