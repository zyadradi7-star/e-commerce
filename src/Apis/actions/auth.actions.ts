"use server";

import { loginData } from "@/app/(auth)/login/page";
import { userData } from "@/app/(auth)/register/page";
import { cookies } from "next/headers";

export async function userRegister(data: userData) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const payLoad = await response.json();
    console.log("payLoad", payLoad);
    return response.ok;
  } catch (error) {
    throw new Error("Api Error");
  }
}

// export async function userLogin(data: loginData) {
//   try {
//     const response = await fetch(
//       "https://ecommerce.routemisr.com/api/v1/auth/signin",
//       {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     const payLoad = await response.json();
//     console.log("payLoad", payLoad);
//     if (response.ok) {
//       const cookie = await cookies();
//       cookie.set("userToken", payLoad.token, {
//         httpOnly: true,
//       });
//     }
//     return response.ok;
//   } catch (error) {
//     throw new Error("Api Error");
//   }
// }
