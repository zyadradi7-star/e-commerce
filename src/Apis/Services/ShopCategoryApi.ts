import React from "react";
import { Category } from "../Types/ProductType";

export default async function getShopCategory(): Promise<Category[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
    );
    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();
    return payLoad.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}
