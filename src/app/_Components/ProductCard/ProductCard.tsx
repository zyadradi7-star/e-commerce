import { ProductType } from "@/Apis/Types/ProductType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import productDetails from "../../productDetails/[id]/page";
import { FaArrowsRotate, FaCartShopping } from "react-icons/fa6";
import AddBtn from "../AddBtn/AddBtn";
import { addToWishList } from "@/Apis/actions/WishListAction/AddtoWishList";
import WishListBtn from "../WishListBtn/WishListBtn";
import { FaRegHeart } from "react-icons/fa";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <>
      <div className="my-2">
        <div className=" border border-blue-200 rounded-lg shadow-md p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          {/* Discount Badge */}
          <div className="relative">
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              -20%
            </span>
            {/* Wishlist Icon */}
            <div className="flex flex-col space-y-2 absolute top-2 right-2">
              <WishListBtn
                prodId={product._id}
                cls={
                  " cursor-pointer w-8 h-8 bg-white rounded-full  flex items-center justify-center text-gray-600 hover:text-red-500 shadow-sm"
                }
                child={<FaRegHeart />}
              />
              <button className=" cursor-pointer w-8 h-8 bg-white rounded-full  flex items-center justify-center text-gray-600 hover:text-green-500 shadow-sm">
                <FaArrowsRotate />
              </button>
              <Link href={`/productDetails/${product._id}`}>
                <button className=" cursor-pointer w-8 h-8 bg-white rounded-full  flex items-center justify-center text-gray-600 hover:text-green-500 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Product Image */}
            <div>
              <Image
                width={300}
                height={200}
                src={product?.imageCover}
                alt={product?.title}
                className="object-contain w-full  fill"
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
            {/* Ratings */}
            <div className="flex space-x-1 text-yellow-400 text-sm mt-1 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 "
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
              </svg>
              {product?.ratingsAverage} ({product.ratingsQuantity})
            </div>
            {/* Pricing */}
            <div className="flex items-end justify-between">
              <div className="flex items-baseline space-x-2 mt-2">
                {product.priceAfterDiscount ? (
                  <>
                    <span className="text-green-600 text-xl font-semibold">
                      {product?.priceAfterDiscount} EGP
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                      {product?.price} EGP
                    </span>
                  </>
                ) : (
                  <span className=" font-bold text-xl ">
                    {product?.price} EGP
                  </span>
                )}
              </div>
              <AddBtn
                prodId={product._id}
                cls={
                  " cursor-pointer w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow text-white"
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
