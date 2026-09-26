import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req: req });

  if (!token)
    return NextResponse.json({ message: "UnAuthorized", status: 401 });

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v2/cart",
      {
        headers: {
          token: token?.accessToken,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok)
      return NextResponse.json({ message: "UnAuthorized", status: 401 });

    const payload = await response.json();
    console.log("payload", payload);
    return NextResponse.json(payload);
  } catch (error) {
    throw new Error("UnAuthorized");
  }
}
