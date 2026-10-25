import getAllOrders from "@/Apis/actions/OrderAction/getALLOrder";
import Link from "next/link";
import React from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { OrderType } from "@/Apis/Types/orderType";
import OrderCard from "../OrderCard/OrderCard";

export default async function AllOrderComp() {
  const Orders: OrderType[] = await getAllOrders();
  console.log("All Orders Data ... ", Orders);

  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div
          id="header"
          className="bg-linear-to-br from-green-600 via-green-400 to-green-400 text-white"
        >
          <div className="container mx-auto px-4 py-10 sm:py-14">
            <nav className="flex items-center gap-2 text-white/70 mb-7">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-medium"> All Orders</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-white/30">
                <FaBoxOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  All Orders
                </h1>
                <p className="text-white/80 mt-1">
                  Explore our complete order collection
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="body" className="container px-4 py-8">
          <div className="mb-6 text-gray-500 text-sm">Showing Orders</div>
          {Orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {Orders.map((order) => (
                <OrderCard order={order} key={order._id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <FaBoxOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-500 mb-6">
                No Orders match your current filters.
              </p>
              <Link
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                href="/products"
              >
                View All Orders
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
