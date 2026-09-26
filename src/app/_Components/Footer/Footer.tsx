import React from "react";
import logo from "../../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaPaypal,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { RiMastercardFill, RiVisaFill } from "react-icons/ri";

export default function Footer() {
  return (
    <>
      <div className=" bg-[#101828] pt-9  text-gray-400">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* fresh Cart */}
            <div className="lg:col-span-4">
              {/* logo */}
              <div className="bg-white py-2 px-4 rounded-lg inline-block mb-6 ">
                <Image src={logo} alt="Fresh Cart" />
              </div>
              {/* description */}
              <p className="mb-6 text-sm leading-relaxed">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>
              {/* Phone , email , location */}
              <div className="flex flex-col gap-4 mb-6">
                <div className=" flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="hover:text-green-400 cursor-pointer">
                    +1 (800) 123-4567
                  </span>
                </div>
                <div className=" flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-green-500"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>

                  <span className="hover:text-green-400 cursor-pointer">
                    support@freshcart.com
                  </span>
                </div>
                <div className=" flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>
              {/* social icons */}
              <div className="flex gap-3 mt-5 text-xl ">
                <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-500 hover:text-white cursor-pointer flex items-center justify-center">
                  <FaFacebookF />{" "}
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-500 hover:text-white cursor-pointer flex items-center justify-center">
                  <FaTwitter />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-500 hover:text-white cursor-pointer flex items-center justify-center">
                  <FaInstagram />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-500 hover:text-white cursor-pointer flex items-center justify-center">
                  <FaYoutube />
                </div>
              </div>
            </div>
            {/* shop */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold mb-5 text-lg  leading-normal">
                Shop
              </h3>
              <ul className="">
                <li className="mt-3.75 hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/"
                  >
                    All Products
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400 ">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/our-tutors"
                  >
                    Categories
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/become-a-tutor"
                  >
                    Brands
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/plans-and-pricing"
                  >
                    Electronics
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/terms-and-conditions"
                  >
                    Men's Fashion
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/privacy-policy"
                  >
                    Women's Fashion
                  </Link>
                </li>
              </ul>
            </div>
            {/* Account */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold mb-5 text-lg  leading-normal">
                Account
              </h3>
              <ul className="">
                <li className="mt-3.75 hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/"
                  >
                    My Account
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/our-tutors"
                  >
                    Order History
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/become-a-tutor"
                  >
                    Wishlist
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/plans-and-pricing"
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/terms-and-conditions"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/privacy-policy"
                  >
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
            {/* Support */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold mb-5 text-lg leading-normal">
                Support
              </h3>
              <ul className="">
                <li className="mt-3.75 hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400 ">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/our-tutors"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/become-a-tutor"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/plans-and-pricing"
                  >
                    Returns & Refunds
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/terms-and-conditions"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold mb-5 text-lg  leading-normal">
                Legal
              </h3>
              <ul className="">
                <li className="mt-3.75 hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mt-3.75   hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/our-tutors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li className="mt-3.75  hover:text-green-400">
                  <Link
                    className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                    href="/become-a-tutor"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-between pb-8 pt-2.25 md:py-8 text-gray-400 text-sm border-t border-gray-800 mt-7.5">
            <p className=" font-normal ">
              © 2026 FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <RiVisaFill />
                <span>Visa</span>
              </div>
              <div className="flex items-center gap-2">
                <RiMastercardFill />

                <span>Mastercard</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPaypal />
                <span>PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
