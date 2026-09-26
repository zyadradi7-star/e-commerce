"use client";

import { addToCart } from "@/Apis/actions/CartAction/AddToCart";
import { toast } from "@/components/ui/toast";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

export default function AddBtn({
  cls,
  child,
  prodId,
}: {
  cls: string;
  child: ReactNode;
  prodId: string;
}) {
  const query = useQueryClient();
  async function handleAddToCart() {
    mutate(prodId);
  }
  const {
    data: addProductData,
    mutate,
    isPending: isAdding,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: (responseData) => {
      toast.add({
        type: "success",
        description: responseData?.message,
      });
      query.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Login First",
      });
    },
  });
  if (isAdding) {
    <ClipLoader color="#41e635" />;
  }

  console.log("CartData", addProductData);

  return (
    <button disabled={isAdding} onClick={handleAddToCart} className={cls}>
      {child}
    </button>
  );
}
