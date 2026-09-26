import Link from "next/link";
import React from "react";
import { FaTags } from "react-icons/fa";
import CategoryCard from "../_Components/CategoryCard/CategoryCard";
import getAllCategory from "@/Apis/Services/CategoriesApi";

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default async function Categories() {
  // جلب الفئات الرئيسية فقط
  const CategoryData: CategoryType[] = await getAllCategory().catch(
    () => [] as CategoryType[],
  );

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
            <span className="text-white font-medium">Categories</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex justify-center items-center text-3xl w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-white/30">
              <FaTags />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Categories
              </h1>
              <p className="text-white/80 mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid الفئات الرئيسية */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {CategoryData.map((category: CategoryType) => (
            <CategoryCard category={category} key={category._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
