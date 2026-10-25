"use client";

import { addToCart } from "@/Apis/actions/CartAction/AddToCart";
import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
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

  function handleAddToCart() {
    mutate(prodId);
  }

  console.log("CartData", addProductData);

  return (
    <button disabled={isAdding} onClick={handleAddToCart} className={cls}>
      {isAdding ? <FaCheck className="w-5 h-5" /> : child}
    </button>
  );
}
