import getAllBrands from "@/Apis/Services/BrandsApi";
import { Brand, ProductType } from "@/Apis/Types/ProductType";
import Link from "next/link";
import React from "react";
import { FaTags } from "react-icons/fa";
import ProductCard from "../_Components/ProductCard/ProductCard";
import BrandCard from "../_Components/BrandCard/BrandCard";

export default async function Brands() {
  const brandData = await getAllBrands();
  console.log("brandData", brandData);
  return (
    <>
      <div className="min-screen bg-gray-50/50">
        {/* header */}
        <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
          <div className="container py-10 sm:py-14">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
              <Link href="/brand">Home</Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">Brands</span>
            </nav>

            <div className="flex items-center gap-5">
              <div className="flex justify-center items-center text-3xl w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-white/30">
                <FaTags />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Top Brands
                </h1>
                <p className="text-white/80 mt-1">
                  Shop from your favorite brands
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {brandData.map((brand: Brand) => {
              return <BrandCard brand={brand} key={brand._id} />;
            })}
          </div>{" "}
        </div>
      </div>
    </>
  );
}
