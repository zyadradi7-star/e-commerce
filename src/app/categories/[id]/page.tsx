import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaBoxes } from "react-icons/fa";
import {
  getSingleCategory,
  getSubCategoriesOnCategory,
} from "@/Apis/Services/CategoriesApi";
import SubCategoryCard from "@/app/_Components/SubCategoryCard/SubCategoryCard";
import { Subcategory } from "@/Apis/Types/ProductType";

interface SingleCategoryProps {
  params: Promise<{ id: string }>;
}

export default async function SingleCategoryPage({
  params,
}: SingleCategoryProps) {
  const { id } = await params;

  // جلب البيانات مباشرة بدون تحويلات أنواع معقدة
  const [categoryData, subCategoriesData] = await Promise.all([
    getSingleCategory(id),
    getSubCategoriesOnCategory(id),
  ]);
  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Header */}
      <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{categoryData?.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            {categoryData?.image && (
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-white/30 shrink-0">
                <Image
                  src={categoryData?.image}
                  alt={categoryData?.name}
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {categoryData.name}
              </h1>
              <p className="text-white/80 mt-1">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="container mx-auto px-4 py-10">
        <Link
          href="/categories"
          className="inline-flex mb-6 items-center gap-2 font-semibold text-gray-600 hover:text-emerald-700  transition-colors"
        >
          <FaArrowLeft /> Back to Categories
        </Link>

        <h2 className="text-lg text-gray-700 font-bold mb-6">
          {subCategoriesData.length} Subcategories in {categoryData.name}
        </h2>

        {subCategoriesData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {subCategoriesData.map((subcategory: Subcategory) => (
              <SubCategoryCard
                key={subcategory._id}
                subcategory={subcategory}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <FaBoxes className="text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              No Subcategories Found
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              There are no subcategories available for {categoryData?.name}{" "}
              right now.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 rounded-xl transition-colors"
            >
              Explore Other Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
