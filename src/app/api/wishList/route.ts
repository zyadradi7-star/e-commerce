import { getTokenFun } from "@/Utilities/getTokenData";
import { NextResponse } from "next/server";

export async function GET() {
  const userToken = await getTokenFun();

  if (!userToken) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: userToken,
          "Content-Type": "application/json",
        },
        cache: "no-store", // إيقاف الكاش لضمان جلب أحدث عناصر المفضلة
      },
    );

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(payload, { status: response.status });
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
