// import { getTokenFun } from "@/Utilities/getTokenData";
"use server";
import { getTokenFun } from "@/Utilities/getTokenData";

export async function getAddress() {
  const token = await getTokenFun();
  if (!token) {
    throw new Error("UnAuthorized");
  }

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        cache: "no-store", // لضمان جلب العناوين الحديثة دائماً وعدم تخزين الاستجابة
      },
    );
    if (!response.ok) throw new Error("UnAuthorized");

    const payload = await response.json();
    console.log(" Get Address Data", payload);
    return payload;
  } catch (error) {
    throw new Error("UnAuthorized");
  }
}
