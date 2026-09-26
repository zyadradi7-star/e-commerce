"use client";
// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";

// // Import Swiper styles
// import "swiper/css";
// import Image from "next/image";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// type sliderType = {
//   spaceBetween: number;
//   slidesPerView: number;
//   pageList: string[];
// };

// export default ({ spaceBetween, slidesPerView, pageList }: sliderType) => {
//   return (
//     <Swiper
//       modules={[Navigation, Pagination]}
//       navigation
//       pagination={{
//         clickable: true,
//         renderBullet(index, className) {
//           return `<span class='${className} bg-green-500! w-6! h-6! '></span>`;
//         },
//         bulletActiveClass: "w-10! h-4! opacity-90!",
//       }}
//       loop={true}
//       spaceBetween={spaceBetween}
//       slidesPerView={slidesPerView}
//       onSlideChange={() => console.log("slide change")}
//       onSwiper={(swiper) => console.log(swiper)}
//     >
//       {pageList.map((src) => (
//         <SwiperSlide>
//           <Image
//             className=" w-full h-80 object-cover"
//             src={src}
//             alt="img"
//             width={400}
//             height={300}
//           />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// *******************************************************************************************************

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import img1 from "../../../assets/images/slider-image-1.jpeg";
import img2 from "../../../assets/images/slider-image-2.jpeg";
import img3 from "../../../assets/images/slider-image-3.jpeg";
type SlideItem = {
  src: string;
  title?: string;
  subtitle?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  primaryBtnTextColor?: string;
};

type sliderType = {
  spaceBetween?: number;
  slidesPerView?: number;
  pageList: string[] | SlideItem[];
};

export const sliderData = [
  {
    src: img1.src,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order on selected items",
    primaryBtnText: "Shop Now",
    primaryBtnLink: "/shop",
    primaryBtnTextColor: "text-green-500",
    secondaryBtnText: "View Deals",
    secondaryBtnLink: "/deals",
  },
  {
    src: img2.src,
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    primaryBtnText: "Shop Now",
    primaryBtnLink: "/product",
    primaryBtnTextColor: "text-blue-500",
    secondaryBtnText: "Learn More",
    secondaryBtnLink: "/about",
  },
  {
    src: img3.src,
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    primaryBtnText: "Order Now",
    primaryBtnLink: "/product",
    primaryBtnTextColor: "text-purple-500",
    secondaryBtnText: "Delivery Info",
    secondaryBtnLink: "/delivery", // تم حذف المسافة الزائدة
  },
];
export default ({
  spaceBetween = 0,
  slidesPerView = 1,
  pageList,
}: sliderType) => {
  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 ">
      {/* 1. زر السهم الأيسر (Previous) */}
      <button
        className="custom-prev absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-white/30 text-green-500 hover:bg-white hover:text-green-600 hidden md:flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 active:scale-95  cursor-pointer    "
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* 2. زر السهم الأيمن (Next) */}
      <button
        className="custom-next absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-white/30 text-green-500 hover:bg-white hover:text-green-700 hidden  md:flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "w-9! opacity-100!",
          renderBullet: (index, className) => {
            return `<span class="${className} inline-block! align-middle! w-3.5! h-3.5! bg-white! opacity-50! rounded-full! transition-all! duration-300! mx-1.5! cursor-pointer!"></span>`;
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        className="w-full h-95 md:h-115"
      >
        {pageList.map((item, index) => {
          const imgSrc = typeof item === "string" ? item : item.src;

          const title =
            typeof item === "string"
              ? "Fresh Products Delivered to your Door"
              : item.title || "Fresh Products Delivered to your Door";
          const subtitle =
            typeof item === "string"
              ? "Get 20% off your first order on selected items"
              : item.subtitle || "Get 20% off your first order";
          const primaryBtnText =
            typeof item === "string"
              ? "Shop Now"
              : item.primaryBtnText || "Shop Now";

          const primaryBtnLink =
            typeof item === "string" ? "/shop" : item.primaryBtnLink || "/shop";

          const secondaryBtnText =
            typeof item === "string"
              ? "View Deals"
              : item.secondaryBtnText || "View Deals";

          const secondaryBtnLink =
            typeof item === "string"
              ? "/deals"
              : item.secondaryBtnLink || "/deals";

          const primaryBtnTextColor =
            typeof item === "string"
              ? "text-green-500"
              : item.primaryBtnTextColor || "text-green-500";
          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full flex items-center">
                {/* خلفية الصورة */}
                <Image
                  className="w-full h-full object-cover"
                  src={imgSrc}
                  alt="banner"
                  fill
                  priority={index === 0}
                />

                {/* Overlay التدرج الأخضر */}
                <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50" />

                {/* المحتوى */}
                <div className="container mx-auto  relative z-10">
                  <div className="max-w-lg space-y-4 text-white">
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                      {title}
                    </h2>

                    <p className="text-emerald-100/90 text-sm md:text-base font-normal">
                      {subtitle}
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                      {primaryBtnText && (
                        <Link href={primaryBtnLink}>
                          <button
                            className={`bg-white ${primaryBtnTextColor} border-2 border-white/50 px-6 py-2 rounded-lg font-bold hover:scale-105 text-sm md:text-base backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer`}
                          >
                            {primaryBtnText}
                          </button>
                        </Link>
                      )}
                      {secondaryBtnText && (
                        <Link href={secondaryBtnLink}>
                          <button className="bg-transparent border-2 border-white/50 text-white px-6 py-2 rounded-lg font-bold text-sm md:text-base backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                            {secondaryBtnText}
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
