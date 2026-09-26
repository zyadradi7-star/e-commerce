"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";

// استيراد تنسيقات Swiper الضرورية فقط
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* 1. الصورة الرئيسية */}
      <div className="relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-xs">
        <Swiper
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          modules={[FreeMode, Thumbs]}
          className="w-full aspect-square"
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full h-full p-4 flex items-center justify-center"
            >
              <Image
                src={img}
                alt={`Product detail ${index + 1}`}
                fill
                className="object-contain p-4"
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. شريط الصور المصغرة (Thumbnails) */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
          }}
          className="w-full thumbs-swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="cursor-pointer py-1">
              <div
                className={`relative aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all duration-200 ${
                  activeIndex === index
                    ? "border-emerald-600 ring-2 ring-emerald-600/20 opacity-100"
                    : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
