import React from "react";
import { BrandType } from "@/app/brands/page";

export default async function getAllBrands(): Promise<BrandType[]> {
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

export async function getSingleBrand(prodId: string): Promise<BrandType> {
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
