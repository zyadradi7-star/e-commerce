"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaXmark,
  FaMagnifyingGlass,
  FaHeart,
  FaCartShopping,
  FaHeadset,
} from "react-icons/fa6";
import logo from "../../../assets/images/freshcart-logo.svg"; // تأكد من مسار الصورة لديك
import { CiUser } from "react-icons/ci";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistCount?: number;
  cartCount?: number;
  sessionStatus: "authenticated" | "unauthenticated" | "loading";
  userName?: string | null;
  onSignOut?: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  wishlistCount = 0,
  cartCount = 0,
  sessionStatus,
  userName,
  onSignOut,
}: MobileDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // بتشيل المسافات من البدايه والنهاية
    if (searchQuery.trim()) {
      // فبتحوّل الأحرف الخاصة والمسافات لصيغة مناسبة داخل الرابط.
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      onClose();
    }
  };

  return (
    <>
      {/* 1. Backdrop / Overlay الخفي مع أنيميشن التعتيم */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 2. Side Drawer القائمة الجانبية */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header (Logo + Close Button) */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <Image
            src={logo}
            alt="FreshCart"
            width={160}
            height={31}
            className="h-8 w-auto"
            priority
          />
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-600"
            aria-label="Close menu"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="p-4 border-b border-gray-100"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              <FaMagnifyingGlass className="text-sm" />
            </button>
          </div>
        </form>

        {/* Navigation Links */}
        <nav className="p-4">
          <div className="space-y-1">
            <Link
              onClick={onClose}
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              Home
            </Link>
            <Link
              onClick={onClose}
              href="/products"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              Shop
            </Link>
            <Link
              onClick={onClose}
              href="/categories"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              Categories
            </Link>
            <Link
              onClick={onClose}
              href="/brands"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              Brands
            </Link>
          </div>
        </nav>

        <div className="mx-4 border-t border-gray-100"></div>

        {/* Quick Actions (Wishlist & Cart) */}
        <div className="p-4 space-y-1">
          <Link
            onClick={onClose}
            href="/wishList"
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <FaHeart className="text-red-500" />
              </div>
              <span className="font-medium text-gray-700">Wishlist</span>
            </div>
            {wishlistCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            onClick={onClose}
            href="/cart"
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                <FaCartShopping className="text-green-600" />
              </div>
              <span className="font-medium text-gray-700">Cart</span>
            </div>
            {cartCount > 0 && (
              <span className="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="mx-4 border-t border-gray-100"></div>

        {/* Auth Section / User Details */}
        <div className="p-4 space-y-1">
          {sessionStatus === "authenticated" ? (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-colors  cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                  <CiUser size={20} />
                </div>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {userName}
                </p>
              </div>
              <button
                onClick={() => {
                  onSignOut?.();
                  onClose();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-red-500"
              >
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
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
                </div>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                onClick={onClose}
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                onClick={onClose}
                href="/register"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-green-600 text-green-600 font-semibold hover:bg-green-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Support Section at Bottom */}
        <div className="mt-auto p-4">
          <Link
            onClick={onClose}
            href="/contact"
            className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-green-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <FaHeadset className="text-green-600 text-lg" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Need Help?
              </div>
              <div className="text-sm text-green-600">Contact Support</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
