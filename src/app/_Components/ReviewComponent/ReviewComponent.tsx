"use client";
import {
  FaStar,
  FaTruck,
  FaBox,
  FaCheck,
  FaArrowRotateLeft,
} from "react-icons/fa6";
import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "@/Apis/Types/ProductType";
import { getReviewsForProduct } from "@/Apis/actions/ReviewAction/getReviewForProduct";
interface Review {
  _id: string;
  comment: string;
  rating: number;
  user?: {
    name: string;
  };
  createdAt?: string;
}

interface ReviewResponse {
  data?: Review[];
  [key: string]: unknown;
}

interface ReviewComponentProps {
  product: ProductType; // استخدام الـ Type الحقيقي الخاص بك
}
export default function ReviewComponent({ product }: ReviewComponentProps) {
  const [activeTab, setActiveTab] = useState<
    "details" | "reviews" | "shipping"
  >("details");
  const productId = product?._id || product?.id;
  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => {
      getReviewsForProduct(productId);
    },
  });
  const reviewsList = reviewsData || [];

  return (
    <>
      <section id="Product-details-tabs" className="py-8">
        <div className="container px-4 mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {/* زر تفاصيل المنتج */}

                <button
                  onClick={() => {
                    setActiveTab("details");
                  }}
                  className={`flex items-center  gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                    activeTab === "details"
                      ? "text-green-600 border-b-2 border-green-600 bg-green-50/50"
                      : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                  } `}
                >
                  <FaBox />
                  Product Details
                </button>
                <button
                  onClick={() => {
                    setActiveTab("reviews");
                  }}
                  className={`flex items-center  gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                    activeTab === "reviews"
                      ? "text-green-600 border-b-2 border-green-600 bg-green-50/50"
                      : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                  } `}
                >
                  <FaStar />
                  Reviews ({product?.ratingsQuantity})
                </button>
                <button
                  onClick={() => {
                    setActiveTab("shipping");
                  }}
                  className={`flex items-center  gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                    activeTab === "shipping"
                      ? "text-green-600 border-b-2 border-green-600 bg-green-50/50"
                      : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                  } `}
                >
                  <FaTruck />
                  Shipping & Returns
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6"></div>
              {activeTab === "details" && (
                <>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        About this Product
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {product?.description || "No description available."}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Product Information
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Category</span>
                            <span className="text-gray-900 font-medium">
                              {product?.category?.name}
                            </span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Subcategory</span>
                            <span className="text-gray-900 font-medium">
                              {product?.subcategory?.[0].name}
                            </span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Brand</span>
                            <span className="text-gray-900 font-medium">
                              {product?.brand?.name}
                            </span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Items Sold</span>
                            <span className="text-gray-900 font-medium">
                              {product?.sold
                                ? `${product.sold}+ sold`
                                : "0 sold"}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm text-gray-600">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check text-green-600 mr-2 w-4"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            Premium Quality Product
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check text-green-600 mr-2 w-4"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            100% Authentic Guarantee
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check text-green-600 mr-2 w-4"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            Fast &amp; Secure Packaging
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <svg
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check text-green-600 mr-2 w-4"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                              />
                            </svg>
                            Quality Tested
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "reviews" && (
                <>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                      <div className="text-center py-8">
                        <div className="text-5xl font-bold text-gray-900 mb-2">
                          {product?.ratingsAverage || 0}
                        </div>

                        {/* حاوية النجوم مع حساب النسبة المئوية لكل نجمة */}
                        <div className="flex items-center justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const rating = product?.ratingsAverage || 0;
                            // حساب نسبة الامتلاء لكل نجمة (من 0 إلى 100%)
                            const fillPercentage =
                              Math.max(0, Math.min(1, rating - (star - 1))) *
                              100;

                            return (
                              <div key={star} className="relative w-5 h-5">
                                {/* النجمة الفارغة في الخلفية */}
                                <FaStar className="absolute top-0 left-0 w-5 h-5 text-gray-300" />

                                {/* النجمة الممتلئة التي يتم قص عرضها حسب النسبة */}
                                <div
                                  className="absolute top-0 left-0 overflow-hidden h-full"
                                  style={{ width: `${fillPercentage}%` }}
                                >
                                  <FaStar className="w-5 h-5 text-yellow-400" />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          Based on{" "}
                          {product?.ratingsQuantity || reviewsList.length}{" "}
                          reviews
                        </p>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-600 w-8">
                            5 star
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full transition-all duration-300 w-1/4" />
                          </div>
                          <span className="text-sm text-gray-500 w-10">
                            25%
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-600 w-8">
                            4 star
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full transition-all duration-300 w-3/5" />
                          </div>
                          <span className="text-sm text-gray-500 w-10">
                            60%
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-600 w-8">
                            3 star
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full transition-all duration-300 w-1/4" />
                          </div>
                          <span className="text-sm text-gray-500 w-10">
                            25%
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-600 w-8">
                            2 star
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full transition-all duration-300 w-[5%]" />
                          </div>
                          <span className="text-sm text-gray-500 w-10">5%</span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-600 w-8">
                            1 star
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full transition-all duration-300  w-[5%]" />
                          </div>
                          <span className="text-sm text-gray-500 w-10">5%</span>
                        </div>
                      </div>
                    </div>

                    <div className=" border-t border-gray-200 mt-6">
                      <div className="flex items-center justify-center py-8 flex-col ">
                        <FaStar className="text-gray-300 w-11 h-11 mb-3" />
                        <p className="text-gray-500">
                          Customer reviews will be displayed here.
                        </p>
                        <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
                          Write a Review
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "shipping" && (
                <>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-green-600 w-12 h-12 text-white rounded-full flex items-center justify-center">
                            <FaTruck className="w-6 h-6" />
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            Shipping Information
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="flex items-center justify-center">
                              <FaCheck className="text-green-500 w-4 h-4" />
                            </div>
                            <span>Free shipping on orders over $50</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="flex items-center justify-center">
                              <FaCheck className="text-green-500 w-4 h-4" />
                            </div>
                            <span>Standard delivery: 3-5 business days</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="flex items-center justify-center">
                              <FaCheck className="text-green-500 w-4 h-4" />
                            </div>
                            <span>
                              Express delivery available (1-2 business days)
                            </span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="flex items-center justify-center">
                              <FaCheck className="text-green-500 w-4 h-4" />
                            </div>
                            <span>Track your order in real-time</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-green-600 w-12 h-12 text-white rounded-full flex items-center justify-center">
                            <FaArrowRotateLeft className="w-6 h-6" />
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            Returns & Refunds
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="flex items-center justify-center">
                              <FaCheck className="text-green-500 w-4 h-4" />
                            </div>
                            <span>30-day hassle-free returns</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="flex items-center justify-center">
                              <FaCheck className="text-green-500 w-4 h-4" />
                            </div>
                            <span>Full refund or exchange available</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="flex items-center justify-center">
                              <FaCheck className="text-green-500 w-4 h-4" />
                            </div>
                            <span>Free return shipping on defective items</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="flex items-center justify-center">
                              <FaCheck className="text-green-500 w-4 h-4" />
                            </div>
                            <span>Easy online return process</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                      <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                        <FaShieldAlt className="text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Buyer Protection Guarantee
                        </h4>
                        <p className="text-sm text-gray-600">
                          Get a full refund if your order doesn't arrive or
                          isn't as described. We ensure your shopping experience
                          is safe and secure.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
