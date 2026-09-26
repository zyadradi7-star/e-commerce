import { ProductType } from "../Types/ProductType";
import { Category } from "./../Types/ProductType";

// واجهة تعريف الفلاتر الاختيارية
export interface FilterParams {
  brand?: string;
  subcategory?: string;
  category?: string;
  sort?: string;
}

// 1. جلب كل المنتجات (مع دعم الفلترة)
export default async function getAllProducts(
  params?: FilterParams,
): Promise<ProductType[]> {
  try {
    // بناء الـ Query String في حال وجود فلاتر
    const query = new URLSearchParams();

    if (params?.brand) query.append("brand", params.brand);
    if (params?.subcategory) query.append("subcategory", params.subcategory);
    if (params?.category) query.append("category", params.category);
    if (params?.sort) query.append("sort", params.sort);

    const queryString = query.toString();
    const url = `https://ecommerce.routemisr.com/api/v1/products${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, { next: { revalidate: 60 } });

    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();

    return payLoad.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Api Error");
  }
}

// 2. جلب تفاصيل منتج واحد
export async function getSingleProduct(prodId: string): Promise<ProductType> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${prodId}`,
    );
    if (!response.ok) throw new Error("Api Error");
    const payLoad = await response.json();

    return payLoad.data;
  } catch (error) {
    console.error(`Error fetching product ${prodId}:`, error);
    throw new Error("Api Error");
  }
}
