import React from "react";
import { Brand } from "../Types/ProductType";

export default async function getAllBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
    );
    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();

    return payLoad.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}

export async function getSingleBrand(prodId: string): Promise<Brand> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${prodId}`,
    );
    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();

    return payLoad.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}
