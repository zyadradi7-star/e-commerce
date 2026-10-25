// import getAllProducts from "@/Apis/Services/ProductsApi";
// import { getSingleBrand } from "@/Apis/Services/BrandsApi";

import getAllProducts from "@/Apis/Services/ProductsApi";
import { getSingleBrand } from "@/Apis/Services/BrandsApi";
import {
  getSingleCategory,
  getSingleSubCategory,
} from "@/Apis/Services/CategoriesApi";
import { ProductType } from "@/Apis/Types/ProductType";
import Link from "next/link";
import React, { Suspense } from "react";
import {
  FaBoxOpen,
  FaFilter,
  FaTags,
  FaTimes,
  FaLayerGroup,
  FaFolder,
} from "react-icons/fa";
import ProductCard from "../_Components/ProductCard/ProductCard";
import Image from "next/image";
import { FadeLoader, MoonLoader } from "react-spinners";

interface ProductsProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    subcategory?: string;
    sort?: string;
  }>;
}

// 1. مكون الـ Loader المخصص لمنطقة الكروت فقط
function ProductsGridLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-28 min-h-87.5 w-full">
      {/* 1. سبينر النقاط الخضراء المطابق للصورة */}
      <FadeLoader color="#16a34a" height={8} width={4} radius={2} margin={2} />

      {/* 2. النص بنفس اللون والحجم والخط */}
      <p className="text-slate-600 text-base font-medium mt-4 tracking-wide">
        Loading products...
      </p>
    </div>
  );
}

// 2. مكون فرعي بجلب المنتجات ويعرض الكروت
async function ProductsGrid({ filters }: { filters: any }) {
  const productsRes = await getAllProducts(filters).catch(() => []);
  const products: ProductType[] = productsRes || [];

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
          <FaBoxOpen className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-500 mb-6">
          No products match your current filters.
        </p>
        <Link
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          href="/products"
        >
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-500 text-sm font-medium">
          Showing{" "}
          <span className="text-gray-900 font-bold">{products.length}</span>{" "}
          products
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.map((product: ProductType) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}

// 3. الصفحة الرئيسية
export default async function Products({ searchParams }: ProductsProps) {
  const filters = await searchParams;

  // جلب تفاصيل الفلاتر للهيدر بالتوازي
  const [brandDetails, subCategoryDetails, categoryDetails] = await Promise.all(
    [
      filters.brand
        ? getSingleBrand(filters.brand).catch(() => null)
        : Promise.resolve(null),
      filters.subcategory
        ? getSingleSubCategory(filters.subcategory).catch(() => null)
        : Promise.resolve(null),
      filters.category
        ? getSingleCategory(filters.category).catch(() => null)
        : Promise.resolve(null),
    ],
  );

  const getFilterUrl = (
    filterToRemove?: "category" | "brand" | "subcategory",
  ) => {
    const params = new URLSearchParams();
    if (filters.category && filterToRemove !== "category") {
      params.set("category", filters.category);
    }
    if (filters.brand && filterToRemove !== "brand") {
      params.set("brand", filters.brand);
    }
    if (filters.subcategory && filterToRemove !== "subcategory") {
      params.set("subcategory", filters.subcategory);
    }
    if (filters.sort) {
      params.set("sort", filters.sort);
    }
    const queryString = params.toString();
    return queryString ? `/products?${queryString}` : "/products";
  };

  const getHeaderTitle = () => {
    const titles = [];
    if (categoryDetails) titles.push(categoryDetails.name);
    if (subCategoryDetails) titles.push(subCategoryDetails.name);
    if (brandDetails) titles.push(brandDetails.name);

    return titles.length > 0 ? titles.join(" - ") : "All Products";
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header ثابت */}
      <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>

            {categoryDetails && (
              <>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Categories
                </Link>
                <span className="text-white/40">/</span>
                <span className="text-white/90 font-medium">
                  {categoryDetails.name}
                </span>
                <span className="text-white/40">/</span>
              </>
            )}

            {subCategoryDetails && (
              <>
                <span className="text-white/90 font-medium">
                  {subCategoryDetails.name}
                </span>
                <span className="text-white/40">/</span>
              </>
            )}

            {brandDetails && (
              <>
                <Link
                  href="/brands"
                  className="hover:text-white transition-colors"
                >
                  Brands
                </Link>
                <span className="text-white/40">/</span>
                <span className="text-white/90 font-medium">
                  {brandDetails.name}
                </span>
                <span className="text-white/40">/</span>
              </>
            )}

            {!categoryDetails && !subCategoryDetails && !brandDetails && (
              <span className="text-white font-medium">All Products</span>
            )}
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative flex justify-center items-center text-3xl w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-white/30 overflow-hidden shrink-0">
              {brandDetails?.image ? (
                <Image
                  fill
                  src={brandDetails.image}
                  alt={brandDetails.name}
                  className="w-full h-full object-contain p-2 bg-white"
                />
              ) : categoryDetails?.image ? (
                <Image
                  fill
                  src={categoryDetails.image}
                  alt={categoryDetails.name}
                  className="w-full h-full object-contain p-2 bg-white"
                />
              ) : subCategoryDetails ? (
                <FaLayerGroup />
              ) : (
                <FaBoxOpen />
              )}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {getHeaderTitle()}
              </h1>
              <p className="text-white/80 mt-1">
                {categoryDetails || brandDetails || subCategoryDetails
                  ? `Showing products for ${getHeaderTitle()}`
                  : "Explore our complete product collection"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* منطقة المحتوى */}
      <div className="container py-8">
        {/* شريط الفلاتر النشطة (ثابت لا ينختفي عند التحميل) */}
        {(filters.category || filters.brand || filters.subcategory) && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <FaFilter className="text-xs text-gray-500" />
              Active Filters:
            </span>

            {filters.category && (
              <Link
                href={getFilterUrl("category")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200 transition-colors group"
              >
                <FaFolder className="text-xs" />
                <span>
                  Category:{" "}
                  {categoryDetails ? categoryDetails.name : "Selected Category"}
                </span>
                <FaTimes className="text-xs text-purple-600 group-hover:text-purple-900 transition-colors" />
              </Link>
            )}

            {filters.brand && (
              <Link
                href={getFilterUrl("brand")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium hover:bg-emerald-200 transition-colors group"
              >
                <FaTags className="text-xs" />
                <span>
                  Brand: {brandDetails ? brandDetails.name : "Selected Brand"}
                </span>
                <FaTimes className="text-xs text-emerald-600 group-hover:text-emerald-900 transition-colors" />
              </Link>
            )}

            {filters.subcategory && (
              <Link
                href={getFilterUrl("subcategory")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition-colors group"
              >
                <FaLayerGroup className="text-xs" />
                <span>
                  Subcategory:{" "}
                  {subCategoryDetails
                    ? subCategoryDetails.name
                    : "Selected Subcategory"}
                </span>
                <FaTimes className="text-xs text-blue-600 group-hover:text-blue-900 transition-colors" />
              </Link>
            )}

            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-gray-700 underline font-medium ml-1 transition-colors"
            >
              Clear all
            </Link>
          </div>
        )}

        {/* تغليف الكروت فقط بـ Suspense لكي يظهر الـ MoonLoader بداخلها عند اختيار أي فلتر */}
        <Suspense
          key={JSON.stringify(filters)}
          fallback={<ProductsGridLoading />}
        >
          <ProductsGrid filters={filters} />
        </Suspense>
      </div>
    </div>
  );
}
