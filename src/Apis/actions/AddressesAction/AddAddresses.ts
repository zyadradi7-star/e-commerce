"use server"; // ^ use with non get request  => mutation

import { AddressesFormData } from "@/app/profile/addresses/page";
import { getTokenFun } from "@/Utilities/getTokenData";

export async function addAddresses(formData: AddressesFormData) {
  const token = await getTokenFun();
  if (!token) {
    throw new Error("Unauthorized. Please log in again");
  }

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) throw new Error("Failed to add address.");

    const payload = await response.json();
    console.log("Add Addresses Data...", payload);
    console.log("token", token);

    return payload;
  } catch (error) {
    throw new Error("UnAuthorized");
  }
}
