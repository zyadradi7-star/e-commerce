import { Button } from "@/components/ui/button";
import Image from "next/image";
import FeaturedProducts from "./_Components/FeaturedProducts/FeaturedProducts";

// import { lazy, Suspense } from "react";
import { MoonLoader } from "react-spinners";
import dynamic from "next/dynamic";
import {
  FaGooglePlay,
  FaHeadset,
  FaLeaf,
  FaShieldAlt,
  FaTag,
  FaTruck,
} from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { RiAppleLine } from "react-icons/ri";
import DealsSection from "./_Components/DealsSection/DealsSection";
import FeaturesBar from "./_Components/FeaturesBar/FeaturesBar";
import Slider, { sliderData } from "@/app/_Components/Slider/Slider";
// import ShopCategory from "./_Components/ShopCategory/ShopCategory";
// ^Lazy Loading
const ShopCategory = dynamic(
  () => import("./_Components/ShopCategory/ShopCategory"),
  {
    loading: () => (
      <div className="flex justify-center items-center h-screen ">
        <MoonLoader color="green" />
      </div>
    ),
  },
);

export default function Home() {
  return (
    <>
      <Slider pageList={sliderData} />
      <FeaturesBar variant="cards" />

      <ShopCategory />
      <DealsSection />
      <FeaturedProducts />
      <section className="py-16 bg-linear-to-b from-white to-gray-50">
        <div className="container">
          <div className="relative">
            <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-3xl border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-br from-teal-200/30 to-transparent rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
              <div className="grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
                <div className="lg:col-span-3 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex items-center justify-center text-white bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 rounded-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-emerald-600 tracking-wide">
                        Newsletter
                      </h3>
                      <p>50,000+ subscribers</p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-snug">
                      Get the Freshest Updates{" "}
                      <span className="text-emerald-600"> Delivered Free</span>
                    </h2>
                    <p className="text-gray-500 mt-3 text-lg">
                      Weekly recipes, seasonal offers & exclusive member perks.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                        <FaLeaf className="text-emerald-600 " />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Fresh Picks Weekly
                      </span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                        <FaTruck className="text-emerald-600 " />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Free Delivery Codes
                      </span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                        <FaTag className="text-emerald-600 " />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Members-Only Deals
                      </span>
                    </div>
                  </div>

                  <form className="pt-2">
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <div className="relative flex-1">
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 transition-all text-base shadow-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        className=" group cursor-pointer  flex items-center justify-center bg-linear-to-br from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 px-8 py-4 rounded-2xl font-semibold text-base text-white shadow-lg transition-all duration-300 gap-3 shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:scale-105"
                      >
                        <span>Subscribe</span>{" "}
                        <FaArrowRight className=" text-sm group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                    <p>✨ Unsubscribe anytime. No spam, ever.</p>
                  </form>
                </div>
                <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
                  <div className="h-full flex flex-col justify-center">
                    <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl"></div>
                      <div className="relative space-y-5">
                        <div className="inline-block bg-emerald-500/20 text-emerald-500 text-xs font-semibold px-3 py-1.5 border border-emerald-500/30">
                          📱 MOBILE APP
                        </div>
                        <h3 className="text-3xl font-bold leading-tight">
                          Shop Faster on Our App
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Get app-exclusive deals & 15% off your first order. s
                        </p>
                        <div className="flex flex-col gap-3">
                          <Link
                            href="#"
                            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-105 "
                          >
                            <RiAppleLine className="text-white" />
                            <div>
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                                Download on
                              </div>
                              <div className="text-sm font-semibold -mt-0.5">
                                App Store
                              </div>
                            </div>
                          </Link>

                          <Link
                            href="#"
                            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-105 "
                          >
                            <FaGooglePlay />
                            <div>
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                                Get it on{" "}
                              </div>
                              <div className="text-sm font-semibold -mt-0.5">
                                Google Play{" "}
                              </div>
                            </div>
                          </Link>
                          <div className="flex items-center gap-2 pt-2 text-sm">
                            <span className="text-yellow-400">★★★★★</span>
                            <span className="text-gray-400">
                              4.9 • 100K+ downloads
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
