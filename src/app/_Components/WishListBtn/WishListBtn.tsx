"use client";

import { addToCart } from "@/Apis/actions/CartAction/AddToCart";
import { addToWishList } from "@/Apis/actions/WishListAction/AddtoWishList";
import { toast } from "@/components/ui/toast";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";

export default function WishListBtn({
  cls,
  child,
  prodId,
}: {
  cls: string;
  child: ReactNode;
  prodId: string;
}) {
  const query = useQueryClient();
  async function handleAddToWishList() {
    mutate(prodId);
  }
  const { data: addWishListData, mutate } = useMutation({
    mutationFn: addToWishList,
    onSuccess: (responseData) => {
      toast.add({
        type: "success",
        description: responseData?.message,
      });
      query.invalidateQueries({ queryKey: ["getWishList"] });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Login First",
      });
    },
  });

  console.log("WishListData..", addWishListData);

  return (
    <button onClick={handleAddToWishList} className={cls}>
      {child}
    </button>
  );
}
