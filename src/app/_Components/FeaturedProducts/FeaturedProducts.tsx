import getAllProducts from "@/Apis/Services/ProductsApi";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { ProductType } from "./../../../Apis/Types/ProductType";

export default async function FeaturedProducts() {
  const data = await getAllProducts();
  console.log(data[0]);

  return (
    <>
      <div className="container">
        <div className="flex items-center gap-3 my-8">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
          <h2 className="text-3xl font-bold text-gray-800">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((product: ProductType) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </div>
      </div>
    </>
  );
}
