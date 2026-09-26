"use server"; // ^ use with non get request  => mutation

import { getTokenFun } from "@/Utilities/getTokenData";
import { changePasswordFormData } from "../../app/_Components/ChangePassComp/ChangePassComp";

export async function ChangePassword(Values: changePasswordFormData) {
  const token = await getTokenFun();
  if (!token) {
    throw new Error("Unauthorized. Please log in again.");
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/uesrs/changeMyPassword`,
      {
        method: "PUT",
        body: JSON.stringify(Values),

        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) throw new Error("Failed to change password");

    const payload = await response.json();
    console.log("payload", payload);
    return payload;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
