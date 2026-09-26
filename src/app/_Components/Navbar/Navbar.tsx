"use client";

import * as React from "react";
import Link from "next/link";

import logo from "../../../assets/images/freshcart-logo.svg";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MdHeadsetMic } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { CartResponseData } from "@/Apis/Types/CartType";
import getAllCategory from "@/Apis/Services/CategoriesApi";
import { Category } from "@/Apis/Types/ProductType";

export default function Navbar() {
  const { data: sessionData, status } = useSession();
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);

  const { data: CartData, isLoading } = useQuery<CartResponseData>({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed To Fetch");
      return response.json();
    },
  });

  const { data: WishListData } = useQuery({
    queryKey: ["getWishList"],
    queryFn: async () => {
      const response = await fetch("/api/wishlist");
      if (!response.ok) throw new Error("Failed To Fetch WishList");
      return response.json();
    },
  });
  const { data: categoriesData } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getAllCategory,
  });

  const wishlistItems: WishlistItem[] =
    WishListData?.data || WishListData || [];
  const categories = categoriesData || [];
  const targetCategories = [
    "Electronics",
    "Women's Fashion",
    "Men's Fashion",
    "Beauty & Health",
  ];

  // فلترة الأراي
  const filteredCategories = categories.filter((item: Category) =>
    targetCategories.includes(item.name),
  );
  console.log("status.....", status);

  return (
    <NavigationMenu className="bg-white max-w-full z-40 py-3 sticky top-0">
      <div className="container">
        <NavigationMenuList className="flex items-center gap-8 justify-between">
          <Image src={logo} alt="Fresh Cart" />
          <NavigationMenuItem className="flex-1 max-w-xl mx-4 hidden lg:block">
            <form className="w-full">
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full px-6 py-3.5 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-base"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <IoMdSearch />
                </button>
              </div>
            </form>
          </NavigationMenuItem>

          {/* links */}
          <div className=" gap-4 hidden md:flex items-center">
            <NavigationMenuItem>
              <Link href="/" className="font-bold hover:text-green-500">
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/products" className="font-bold hover:text-green-500">
                Shop
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              {/* أضفنا /cat للـ group */}
              <div className="relative group/cat cursor-pointer ">
                <button className="flex items-center gap-1.5 font-bold hover:text-green-600 transition-colors">
                  Categories
                  <svg
                    className="svg-inline--fa fa-chevron-down  transition-transform group-hover/cat:rotate-180 w-3 h-3"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                  </svg>
                </button>

                {/* ربط الـ opacity والـ visibility بـ group-hover/cat */}
                <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover/cat:opacity-100 group-hover/cat:visible transition-all duration-200">
                  <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-50">
                    <Link
                      className="block px-4 py-2.5 font-semibold text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                      href="/categories"
                    >
                      AllCategories
                    </Link>
                    {filteredCategories.map((item) => (
                      <Link
                        key={item._id}
                        className="block px-4 py-2.5 font-semibold text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href={`/products?category=${item._id}`}
                      >
                        {item?.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/brands" className="font-bold hover:text-green-500">
                Brands
              </Link>
            </NavigationMenuItem>
          </div>

          <div className=" gap-4 hidden md:flex items-center">
            {status === "authenticated" ? (
              <>
                {" "}
                <Link
                  className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
                  href="/contact"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <MdHeadsetMic className="text-green-500" />
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-400">Support</div>
                    <div className="font-semibold text-gray-700">24/7 Help</div>
                  </div>
                </Link>
                <Link
                  href="/wishList"
                  className=" relative w-10 h-10 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  {wishlistItems.length > 0 && (
                    <span className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center ring-2 ring-white font-bold text-xs">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link
                  href="/cart"
                  className=" relative w-10 h-10 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6  text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {CartData?.numOfCartItems === 0 ? (
                    ""
                  ) : (
                    <span className="w-4 h-4 bg-green-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center ring-2 ring-white font-bold text-sm">
                      {CartData?.numOfCartItems}
                    </span>
                  )}
                </Link>
                {/* LogOUt */}
                <div className="hidden lg:block relative">
                  <button
                    onClick={() => {
                      setIsDropDownOpen(!isDropDownOpen);
                    }}
                    className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                    title="Account"
                  >
                    <svg
                      data-prefix="far"
                      data-icon="circle-user"
                      className="svg-inline--fa fa-circle-user text-xl cursor-pointer w-6 h-6 text-gray-500 group-hover:text-green-600 transition-colors"
                      role="img"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6-35.6-37.3-57.5-87.9-57.5-143.6 0-114.9 93.1-208 208-208s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"
                      />
                    </svg>
                  </button>
                  <div
                    className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-200 origin-top-right ${
                      isDropDownOpen
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible"
                    }`}
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <svg
                            data-prefix="far"
                            data-icon="circle-user"
                            className="svg-inline--fa fa-circle-user w-6 h-6 text-green-400"
                            role="img"
                            viewBox="0 0 512 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6-35.6-37.3-57.5-87.9-57.5-143.6 0-114.9 93.1-208 208-208s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {sessionData?.user?.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {sessionData?.user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/profile/addresses"
                      >
                        <svg
                          data-prefix="far"
                          data-icon="user"
                          className="svg-inline--fa fa-user w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 448 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M144 128a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm208 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM48 480c0-70.7 57.3-128 128-128l96 0c70.7 0 128 57.3 128 128l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8c0-97.2-78.8-176-176-176l-96 0C78.8 304 0 382.8 0 480l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8z"
                          />
                        </svg>
                        My Profile
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/allOrders"
                      >
                        <svg
                          data-prefix="fas"
                          data-icon="box-open"
                          className="svg-inline--fa fa-box-open w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 640 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"
                          />
                        </svg>
                        My Orders
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/wishList"
                      >
                        <svg
                          data-prefix="far"
                          data-icon="heart"
                          className="svg-inline--fa fa-heart w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                          />
                        </svg>
                        My Wishlist
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/profile/addresses"
                      >
                        <svg
                          data-prefix="far"
                          data-icon="address-book"
                          className="svg-inline--fa fa-address-book w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M384 48c8.8 0 16 7.2 16 16l0 384c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16L80 64c0-8.8 7.2-16 16-16l288 0zM96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM240 248a56 56 0 1 0 0-112 56 56 0 1 0 0 112zm-32 40c-44.2 0-80 35.8-80 80 0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16 0-44.2-35.8-80-80-80l-64 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 192c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64z"
                          />
                        </svg>
                        Addresses
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/profile/settings"
                      >
                        <svg
                          data-prefix="fas"
                          data-icon="gear"
                          className="svg-inline--fa fa-gear w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"
                          />
                        </svg>
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                        <svg
                          data-prefix="fas"
                          data-icon="right-from-bracket"
                          className="svg-inline--fa fa-right-from-bracket w-4"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M505 273c9.4-9.4 9.4-24.6 0-33.9L361 95c-6.9-6.9-17.2-8.9-26.2-5.2S320 102.3 320 112l0 80-112 0c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l112 0 0 80c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L505 273zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
                {/* <span>
                  <Button
                    onClick={handleLogOut}
                    className="flex gap-2 font-bold bg-green-500 hover:bg-green-600 text-white py-2 px-3 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6  "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    LogOut
                  </Button>
                </span> */}
              </>
            ) : (
              <Link href="/login">
                <Button className="flex gap-2  font-bold bg-green-500 hover:bg-green-600 text-white py-2 px-3 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6  "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Sign in
                </Button>
              </Link>
            )}
          </div>

          <NavigationMenuItem className="md:hidden">
            <NavigationMenuTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/" title="Home">
                  Home
                </ListItem>

                <ListItem href="/shop" title="Shop">
                  Shop{" "}
                </ListItem>
                <ListItem href="/categories" title="Categories">
                  Categories
                </ListItem>
                <ListItem href="/brands" title="Brands">
                  Brands
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
