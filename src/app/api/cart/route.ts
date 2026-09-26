// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const token = await getToken({ req: req });

//   if (!token)
//     return NextResponse.json({ message: "UnAuthorized", status: 401 });

//   try {
//     const response = await fetch(
//       "https://ecommerce.routemisr.com/api/v2/cart",
//       {
//         headers: {
//           token: tokenaccessToken,
//           "Content-Type": "application/json",
//         },
//       },
//     );
//     if (!response.ok)
//       return NextResponse.json({ message: "UnAuthorized", status: 401 });

//     const payload = await response.json();
//     console.log("payload", payload);
//     return NextResponse.json(payload);
//   } catch (error) {
//     throw new Error("UnAuthorized");
//   }
// }

import { getTokenFun } from "@/Utilities/getTokenData";
import { NextResponse } from "next/server";

export async function GET() {
  // 1. استدعاء الدالة لتسترجع نص التوكن مباشرة
  const userToken = await getTokenFun();

  // 2. التحقق من وجود التوكن
  if (!userToken) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v2/cart",
      {
        headers: {
          token: userToken, // كائن نصي جاهز بدون الحاجة لـ token.accessToken
          "Content-Type": "application/json",
        },
      },
    );

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(payload, { status: response.status });
    }

    console.log("payload Cart...", payload);
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
