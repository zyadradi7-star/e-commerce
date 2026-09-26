import Link from "next/link";
import React from "react";
import { Brand } from "@/Apis/Types/ProductType";
import Image from "next/image";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <>
      <Link
        className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
        href={`/products?brand=${brand?._id}`}
      >
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
          <Image
            alt={brand?.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            src={brand?.image}
            fill
          />
        </div>
        <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
          {brand?.name}
        </h3>
        <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-violet-600 flex items-center gap-1">
            View Products
            <svg
              data-prefix="fas"
              data-icon="arrow-right"
              className="svg-inline--fa fa-arrow-right w-5 h-5"
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
