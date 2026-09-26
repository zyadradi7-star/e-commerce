import Link from "next/link";
import React from "react";
import Image from "next/image";
import { CategoryType } from "@/app/categories/page";

export default function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <>
      <Link
        className="group overflow bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
        href={`/categories/${category._id}`}
      >
        <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
          <Image
            fill
            alt={category?.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            src={category?.image}
          />
        </div>
        <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-green-600 transition-colors truncate">
          {category?.name}
        </h3>
        <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-green-600 flex items-center gap-1">
            View Subcategory
            <svg
              data-prefix="fas"
              data-icon="arrow-right"
              className="svg-inline--fa fa-arrow-right w-4 h-4"
              role="img"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              />
            </svg>
          </span>
        </div>
      </Link>
    </>
  );
}
