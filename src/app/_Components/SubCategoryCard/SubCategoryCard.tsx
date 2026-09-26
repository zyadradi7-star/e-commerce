import { Subcategory } from "@/Apis/Types/ProductType";
import Link from "next/link";
import React from "react";
interface SubCategoryCardProps {
  subcategory: Subcategory;
}
export default function SubCategoryCard({ subcategory }: SubCategoryCardProps) {
  return (
    <>
      <Link
        className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
        href={`/products?subcategory=${subcategory._id}`}
      >
        <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
          <svg
            data-prefix="fas"
            data-icon="folder-open"
            className="svg-inline--fa fa-folder-open h-4 w-4 text-green-600"
            role="img"
            viewBox="0 0 576 512"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M56 225.6L32.4 296.2 32.4 96c0-35.3 28.7-64 64-64l138.7 0c13.8 0 27.3 4.5 38.4 12.8l38.4 28.8c5.5 4.2 12.3 6.4 19.2 6.4l117.3 0c35.3 0 64 28.7 64 64l0 16-365.4 0c-41.3 0-78 26.4-91.1 65.6zM477.8 448L99 448c-32.8 0-55.9-32.1-45.5-63.2l48-144C108 221.2 126.4 208 147 208l378.8 0c32.8 0 55.9 32.1 45.5 63.2l-48 144c-6.5 19.6-24.9 32.8-45.5 32.8z"
            />
          </svg>
        </div>
        <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors mb-2">
          {subcategory?.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Browse Products</span>
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
        </div>
      </Link>
    </>
  );
}
