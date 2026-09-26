import getAllProducts from "@/Apis/Services/ProductsApi";
import { getSingleBrand } from "@/Apis/Services/BrandsApi";
// استيراد دالة getSingleCategory و getSingleSubCategory
import {
  getSingleCategory,
  getSingleSubCategory,
} from "@/Apis/Services/CategoriesApi";
import { ProductType } from "@/Apis/Types/ProductType";
import Link from "next/link";
import React from "react";
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

interface ProductsProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    subcategory?: string;
    sort?: string;
  }>;
}

export default async function Products({ searchParams }: ProductsProps) {
  // 1. قراءة الفلاتر من الـ URL (متوافق مع Next.js 15)
  const filters = await searchParams;

  // 2. جلب البيانات بالتوازي مع حماية الصفحة عند فشل أي API
  const [productsRes, brandDetails, subCategoryDetails, categoryDetails] =
    await Promise.all([
      getAllProducts(filters).catch(() => []),
      filters.brand
        ? getSingleBrand(filters.brand).catch(() => null)
        : Promise.resolve(null),
      filters.subcategory
        ? getSingleSubCategory(filters.subcategory).catch(() => null)
        : Promise.resolve(null),
      filters.category
        ? getSingleCategory(filters.category).catch(() => null)
        : Promise.resolve(null),
    ]);

  // 3. استخراج مصفوفة المنتجات
  const products: ProductType[] = productsRes || [];

  // دالة لبناء URL الرابط عند حذف فلتر معين مع الحفاظ على الفلاتر الأخرى
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

  // عنوان الهيدر الديناميكي
  const getHeaderTitle = () => {
    const titles = [];
    if (categoryDetails) titles.push(categoryDetails.name);
    if (subCategoryDetails) titles.push(subCategoryDetails.name);
    if (brandDetails) titles.push(brandDetails.name);

    return titles.length > 0 ? titles.join(" - ") : "All Products";
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header ديناميكي */}
      <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container py-10 sm:py-14">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>

            {/* Category Breadcrumb */}
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

            {/* SubCategory Breadcrumb */}
            {subCategoryDetails && (
              <>
                <span className="text-white/90 font-medium">
                  {subCategoryDetails.name}
                </span>
                <span className="text-white/40">/</span>
              </>
            )}

            {/* Brand Breadcrumb */}
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

          {/* Header Content */}
          <div className="flex items-center gap-5">
            {/* الشعار أو الأيقونة */}
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

            {/* النصوص */}
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

      {/* Grid المنتجات */}
      <div className="container py-8">
        {/* Active Filters Bar - يظهر عند تفعيل أي فلتر */}
        {(filters.category || filters.brand || filters.subcategory) && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <FaFilter className="text-xs text-gray-500" />
              Active Filters:
            </span>

            {/* فلتر القسم الرئيسي (Category Badge) */}
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

            {/* فلتر الماركة (Brand Badge) */}
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

            {/* فلتر الـ Subcategory Badge */}
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

            {/* زر مسح كل الفلاتر */}
            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-gray-700 underline font-medium ml-1 transition-colors"
            >
              Clear all
            </Link>
          </div>
        )}

        {/* عدد المنتجات */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-500 text-sm font-medium">
            Showing{" "}
            <span className="text-gray-900 font-bold">{products.length}</span>{" "}
            products
          </div>
        </div>

        {/* شبكة المنتجات (Product Grid) */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {products.map((product: ProductType) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
