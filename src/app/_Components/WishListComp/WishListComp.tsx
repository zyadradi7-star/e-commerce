"use client";
import { CartResponseData } from "@/Apis/Types/CartType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import AddBtn from "../AddBtn/AddBtn";
import { FaCartShopping } from "react-icons/fa6";
import { toast } from "@/components/ui/toast";
import { deleteWishListItem } from "@/Apis/actions/WishListAction/deleteWishList-Item";

export default function WishListComp() {
  const query = useQueryClient();

  const { data: CartData } = useQuery<CartResponseData>({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed To Fetch Cart");
      return response.json();
    },
  });

  const { data: WishListData, isLoading } = useQuery({
    queryKey: ["getWishList"],
    queryFn: async () => {
      const response = await fetch("/api/wishlist");
      if (!response.ok) throw new Error("Failed To Fetch WishList");
      return response.json();
    },
  });

  // استخراج المصفوفة بشكل آمن تجنباً لأنهيار التطبيق
  const wishlistItems: any[] = Array.isArray(WishListData?.data)
    ? WishListData.data
    : Array.isArray(WishListData)
      ? WishListData
      : [];

  const isItemInCart = (productId: string) => {
    return CartData?.data?.products?.some(
      (cartItem: any) =>
        cartItem.product?._id === productId ||
        cartItem.product?.id === productId,
    );
  };

  const { mutate: delWishListItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteWishListItem,
    onSuccess: (responseData) => {
      toast.add({
        type: "success",
        description: responseData?.message || "Item removed from wishlist",
      });
      query.invalidateQueries({ queryKey: ["getWishList"] });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Failed To Delete WishList Item",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isWishListEmpty = wishlistItems.length === 0;
  if (isWishListEmpty) {
    return (
      <div>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
                <FaRegHeart className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Browse products and save your favorites here.
            </p>
            <Link
              className="inline-flex items-center gap-2 bg-linear-to-r from-green-600 to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]"
              href="/products"
            >
              Browse Products
              <svg
                className="w-4 h-4"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link className="hover:text-green-600 transition-colors" href="/">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <FaRegHeart className="text-xl text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  My Wishlist
                </h1>
                <p className="text-gray-500 text-sm">
                  {wishlistItems.length}{" "}
                  {wishlistItems.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {wishlistItems.map((item, index) => {
              const productId =
                item?._id || item?.id || `wishlist-item-${index}`;
              const inCart = isItemInCart(productId);

              return (
                <div
                  key={productId} // إضاقة الـ Key هنا لـ React
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
                >
                  <div className="md:col-span-6 flex items-center gap-4">
                    <Link
                      className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                      href={`/productDetails/${productId}`}
                    >
                      <img
                        alt={item?.title || "Product image"}
                        className="w-full h-full object-contain p-2"
                        src={item?.imageCover}
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2"
                        href={`/productDetails/${productId}`}
                      >
                        {item?.title}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">
                        {item?.category?.name}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                    <span className="md:hidden text-sm text-gray-500">
                      Price:
                    </span>
                    <div className="text-right md:text-center font-semibold text-gray-900">
                      {item?.price} EGP
                    </div>
                  </div>

                  <div className="md:col-span-2 flex md:justify-center">
                    <span className="md:hidden text-sm text-gray-500 mr-2">
                      Status:
                    </span>
                    {inCart ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <FaCartShopping className="w-3.5 h-3.5" />
                        In Cart
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        In Stock
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                    {inCart ? (
                      <Link
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                        href="/cart"
                      >
                        View Cart
                      </Link>
                    ) : (
                      <AddBtn
                        prodId={productId} // تمرير المعرف المصحح
                        cls="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-600 text-white hover:bg-green-700"
                        child={
                          <>
                            <FaCartShopping />
                            Add to Cart
                          </>
                        }
                      />
                    )}

                    <button
                      onClick={() => delWishListItem(productId)}
                      disabled={isDeleting}
                      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50 shrink-0"
                      title="Remove"
                    >
                      <svg
                        className="w-4 h-4"
                        role="img"
                        viewBox="0 0 448 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            className="text-gray-500 hover:text-green-600 text-sm font-medium transition-colors"
            href="/products"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
