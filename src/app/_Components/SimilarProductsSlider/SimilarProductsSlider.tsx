"use client";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ProductCard/ProductCard";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductType } from "@/Apis/Types/ProductType";
interface SimilarProductsProps {
  products: ProductType[];
}
export default async function SimilarProductsSlider({
  products,
}: SimilarProductsProps) {
  return (
    <>
      <section id="similar-product" className="py-10">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            {/* title */}
            <div className="flex items-center gap-3 my-8 ">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
              <h2 className="text-3xl font-bold text-gray-800">
                You May Also<span className="text-emerald-600">Like</span>
              </h2>
            </div>
            {/* Navigation */}
            <div className="flex space-x-2">
              <button className="custom-prev bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition ">
                <IoIosArrowBack size={20} />
              </button>
              <button className="custom-next bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition ">
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16} // المسافة بين الكاردات
            slidesPerView={1} // الافتراضي للموبايل
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 2 }, // الشاشات المتوسطة
              768: { slidesPerView: 3 }, // التابلت
              1024: { slidesPerView: 4 }, // اللابتوب
              1280: { slidesPerView: 5 }, // الشاشات الكبيرة (تعرض 5 كاردات مثل الصورة)
            }}
            className="w-full pb-4"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product._id || index} className="h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
