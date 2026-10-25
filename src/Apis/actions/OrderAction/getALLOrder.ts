import React from "react";
import { OrderType } from "@/Apis/Types/orderType";

export default async function getAllOrders(): Promise<OrderType[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/orders/",
    );
    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();
    return payLoad.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}
