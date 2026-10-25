"use server";
import { getTokenFun } from "@/Utilities/getTokenData"; // قم بإلغاء التعليق إذا كان الـ API يتطلب توكن

export async function getReviewsForProduct(productId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const payload = await response.json();

    if (!response.ok) {
      // إرجاع رسالة الخطأ القادمة من الـ API نفسه إن وجدت
      throw new Error(payload.message || "Failed to fetch reviews");
    }

    return payload;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    // طباعة الخطأ الحقيقي في الـ terminal للتصحيح (Debugging)
    console.error("Error fetching reviews:", errorMessage);
    throw new Error(errorMessage);
  }
}
