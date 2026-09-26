import getShopCategory from "@/Apis/Services/ShopCategoryApi";
import Image from "next/image";
import React from "react";

export default async function ShopCategory() {
  const data = await getShopCategory();
  console.log(data);

  return (
    <>
      <div className="container">
        <div className="flex items-center gap-3 my-8 ">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
          <h2 className="text-3xl font-bold text-gray-800">
            Shop BY<span className="text-emerald-600">Category</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.map((category) => {
            return (
              <div
                key={category._id}
                className="category flex flex-col items-center bg-white border border-gray-200 rounded-xl p-3 cursor-pointer shadow-sm hover:shadow-md"
              >
                <Image
                  className="w-25 h-25 rounded-full object-cover mb-5"
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                />
                <h3>{category.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
