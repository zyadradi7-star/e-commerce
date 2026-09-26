"use server"; // ^ use with non get request  => mutation

import { ProfileFormData } from "@/app/_Components/profileInformationComp/profileInformationComp";
import { getTokenFun } from "@/Utilities/getTokenData";

export async function updateUserData(Values: ProfileFormData) {
  const token = await getTokenFun();
  if (!token) {
    throw new Error("Unauthorized. Please log in again.");
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      {
        method: "PUT",
        body: JSON.stringify(Values),

        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) throw new Error("Failed To Update User Data");

    const payload = await response.json();
    console.log("Update User Data....", payload);
    return payload;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
