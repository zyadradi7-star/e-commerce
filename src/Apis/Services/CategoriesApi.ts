import React from "react";
import { Category, Subcategory } from "../Types/ProductType";

export default async function getAllCategory(): Promise<Category[]> {
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

export async function getSingleCategory(
  categoryId: string,
): Promise<Subcategory> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
    );
    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();

    return payLoad.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}

// getSubCategoriesOnCategory
export async function getSubCategoriesOnCategory(
  categoryId: string,
): Promise<Subcategory[]> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    );
    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();

    return payLoad.data;
  } catch (error) {
    return [];
  }
}

export async function getAllSubCategory(): Promise<[Subcategory]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories",
    );
    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();

    return payLoad.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}

//
export async function getSingleSubCategory(
  categoryId: string,
): Promise<Subcategory> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${categoryId}`,
    );
    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();

    return payLoad.data;
  } catch (error) {
    throw new Error("Api Error");
  }
}
