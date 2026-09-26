import { ProductType } from "@/Apis/Types/ProductType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaArrowsRotate,
  FaCartShopping,
  FaStar,
  FaStarHalfStroke,
  FaRegStar,
} from "react-icons/fa6";
import AddBtn from "../AddBtn/AddBtn";
import WishListBtn from "../WishListBtn/WishListBtn";
import { FaRegHeart } from "react-icons/fa";

export default function ProductCard({ product }: { product: ProductType }) {
  const rating = product?.ratingsAverage || 0;
  const hasDiscount = Boolean(
    product?.priceAfterDiscount && product.priceAfterDiscount < product.price,
  );
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100,
      )
    : 0;

  return (
    <>
      <div className="my-2">
        <div className="border border-blue-200 rounded-lg shadow-md p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          {/* Discount Badge */}
          <div className="relative">
            {hasDiscount && discountPercentage > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                -{discountPercentage}%
              </span>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 absolute top-2 right-2 z-10">
              <WishListBtn
                prodId={product._id}
                cls={
                  "cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 shadow-sm"
                }
                child={<FaRegHeart />}
              />
              <button className="cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-green-500 shadow-sm">
                <FaArrowsRotate />
              </button>
              <Link href={`/productDetails/${product._id}`}>
                <button className="cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-green-500 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Product Image */}
            <div className="w-full h-48 relative flex items-center justify-center">
              <Image
                width={300}
                height={200}
                src={product?.imageCover || "/placeholder.jpg"}
                alt={product?.title || "Product Image"}
                className="object-contain max-h-full w-auto"
                priority={false}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-4">
            <div className="text-xs text-gray-500 mb-1 line-clamp-1">
              {product?.title}
            </div>
            <p className="font-medium mb-1 cursor-pointer line-clamp-1">
              {product?.description}
            </p>

            {/* Dynamic Ratings */}
            <div className="flex text-yellow-400 text-sm mt-1 gap-1 items-center">
              <div className="flex items-center space-x-0.5">
                {Array.from({ length: 5 }, (_, index) => {
                  const starValue = index + 1;
                  if (rating >= starValue) {
                    return <FaStar key={index} className="text-yellow-400" />;
                  } else if (rating >= starValue - 0.5) {
                    return (
                      <FaStarHalfStroke
                        key={index}
                        className="text-yellow-400"
                      />
                    );
                  } else {
                    return <FaRegStar key={index} className="text-gray-300" />;
                  }
                })}
              </div>
              <span className="text-xs text-gray-600 ms-1">
                {product?.ratingsAverage} ({product?.ratingsQuantity})
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-end justify-between mt-2">
              <div className="flex items-baseline space-x-2">
                {product?.priceAfterDiscount ? (
                  <>
                    <span className="text-green-600 text-xl font-semibold">
                      {product?.priceAfterDiscount} EGP
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                      {product?.price} EGP
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-xl">
                    {product?.price} EGP
                  </span>
                )}
              </div>
              <AddBtn
                prodId={product?._id}
                cls={
                  "cursor-pointer w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow text-white"
                }
                child={<FaCartShopping />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
