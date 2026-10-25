"use client";

import { addToWishList } from "@/Apis/actions/WishListAction/AddtoWishList";
import { deleteWishListItem } from "@/Apis/actions/WishListAction/deleteWishList-Item";
import { toast } from "@/components/ui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { FaHeart } from "react-icons/fa"; // القلب الأحمر الممتلئ
import { ClipLoader } from "react-spinners";

type WishListItem = string | { _id?: string; id?: string };

interface WishListResponse {
  data?: WishListItem[];
  message?: string;
  [key: string]: unknown; // للسماح بأي حقول أخرى مع عدم استخدام any
}
export default function WishListBtn({
  cls,
  child,
  prodId,
}: {
  cls: string;
  child: ReactNode;
  prodId: string;
}) {
  const queryClient = useQueryClient();

  // 1. جلب بيانات المفضلة الحالية من الكاش
  const { data: wishListData } = useQuery<WishListResponse>({
    queryKey: ["getWishList"],
    queryFn: async () => {
      const response = await fetch("/api/wishlist");
      if (!response.ok) throw new Error("Failed To Fetch wishList");
      return response.json();
    },
  });

  // 2. التحقق مما إذا كان هذا المنتج موجوداً داخل قائمة المفضلة أم لا
  const wishListArray = wishListData?.data || [];
  const isInWishList = wishListArray.some((item: WishListItem) => {
    if (typeof item === "string") {
      return item === prodId;
    }
    return (item?._id || item?.id) === prodId;
  });

  // 3. Mutation لإضافة المنتج للمفضلة
  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: addToWishList,
    onSuccess: (responseData) => {
      toast.add({
        type: "success",
        description: responseData?.message || "Added to Wishlist",
      });
      // تحديث كاش المفضلة لتظهر الأيقونة الحمراء فوراً
      queryClient.invalidateQueries({ queryKey: ["getWishList"] });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Please Login First",
      });
    },
  });

  // 4. Mutation لحذف المنتج من المفضلة
  const { mutate: removeMutate, isPending: isRemoving } = useMutation({
    mutationFn: deleteWishListItem,
    onSuccess: (responseData) => {
      toast.add({
        type: "success",
        description: responseData?.message || "Removed from Wishlist",
      });
      // تحديث كاش المفضلة لتعود الأيقونة العادية فوراً
      queryClient.invalidateQueries({ queryKey: ["getWishList"] });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Failed to remove",
      });
    },
  });

  const isPending = isAdding || isRemoving;

  // 5. دالة الضغط (تبديل بين الإضافة والحذف)
  function handleToggleWishList() {
    if (isInWishList) {
      removeMutate(prodId);
    } else {
      addMutate(prodId);
    }
  }

  return (
    <button
      disabled={isPending}
      onClick={handleToggleWishList}
      className={`${cls} ${
        isInWishList
          ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
          : "border-gray-200 text-gray-700 bg-white hover:border-green-300 hover:text-green-600"
      }`}
    >
      {isPending ? (
        <ClipLoader size={15} color="#ef4444" />
      ) : isInWishList ? (
        /* القلب الأحمر الممتلئ عند الإضافة */
        <>
          {" "}
          <FaHeart className=" w-4 h-4 " />
          <span>In Wishlist</span>
        </>
      ) : (
        /* الأيقونة الافتراضية المفرغة الممررة من ProductCard */
        child
      )}
    </button>
  );
}
