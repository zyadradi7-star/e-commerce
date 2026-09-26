"use server";

import { ProfileFormData } from "@/app/_Components/profileInformationComp/profileInformationComp";
import { getTokenFun } from "@/Utilities/getTokenData";

export async function updateUserData(Values: ProfileFormData) {
  const token = await getTokenFun();

  if (!token) {
    return { success: false, message: "Unauthorized. Please log in again." };
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

    const payload = await response.json();

    // إذا فشل الطلب، نرجع رسالة الخطأ القادمة من الـ API مباشرة
    if (!response.ok) {
      return {
        success: false,
        message: payload.message || "Failed To Update User Data",
        errors: payload.errors,
      };
    }

    console.log("Update User Data....", payload);
    return { success: true, data: payload };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}
