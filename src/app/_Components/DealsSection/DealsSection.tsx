"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DealsSection() {
  return (
    <section className="py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* 👈 الكارت الأول: يدخل من اليسار */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="relative">
              <div className="inline-flex gap-2 items-center bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                <span>🔥</span>
                <span>Deal of the Day</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Fresh Organic Fruits
              </h3>
              <p className="text-white/80 mb-4">
                Get up to 40% off on selected organic fruits
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold">40% OFF</div>
                <div className="text-sm text-white/70">
                  Use code:{" "}
                  <span className="font-bold text-white">ORGANIC40</span>
                </div>
              </div>
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Shop Now</span> <FaArrowRight />
              </Link>
            </div>
          </motion.div>

          {/* 👉 الكارت الثاني: يدخل من اليمين */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="relative">
              <div className="inline-flex gap-2 items-center bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                <span>✨</span>
                <span>New Arrivals</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Exotic Vegetables
              </h3>
              <p className="text-white/80 mb-4">
                Discover our latest collection of premium vegetables
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold">25% OFF</div>
                <div className="text-sm text-white/70">
                  Use code:{" "}
                  <span className="font-bold text-white">FRESH25</span>
                </div>
              </div>
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Explore Now</span> <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
