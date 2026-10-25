import Image from "next/image";
import { OrderType } from "@/Apis/Types/orderType";
import { FaBox, FaCreditCard, FaMoneyBillWave } from "react-icons/fa6";

export default function OrderCard({ order }: { order: OrderType }) {
  return (
    <div className="my-2">
      <div className="border border-blue-200 rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col justify-between">
        {/* Header: Order ID & Status Badges */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FaBox className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Order ID</span>
                {/* يمكنك استبدال #64b2f1 بـ order?._id لاحقاً */}
                <span className="font-bold text-gray-800 text-sm">
                  #{order?._id.slice(-6)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  order?.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order?.isPaid ? "Paid" : "Unpaid"}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  order?.isDelivered
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order?.isDelivered ? "Delivered" : "Processing"}
              </span>
            </div>
          </div>

          {/* Order Image Placeholder */}
          <div className="space-y-2.5 max-h-20 overflow-y-auto pr-1">
            {order?.cartItems?.map((item) => (
              <div
                key={item?._id}
                className="flex items-center gap-3 bg-gray-50/60 p-2.5 rounded-xl"
              >
                <div className="relative w-12 h-12 shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100">
                  <Image
                    fill
                    src={item?.product?.imageCover || "/placeholder.jpg"}
                    alt={item?.product?.title || "Product"}
                    className="object-contain p-1"
                    sizes="48px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-gray-800 truncate">
                    {item?.product?.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item?.count} * {item?.price} EGP
                  </p>
                </div>

                <div className="text-xs font-bold text-gray-700">
                  {item?.count * item?.price} EGP
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Payment Method & Total Price */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            {order?.paymentMethodType === "cash" ? (
              <FaMoneyBillWave className="text-green-500" />
            ) : (
              <FaCreditCard className="text-blue-500" />
            )}
            <span>{order?.paymentMethodType}</span>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-400 block">Total Price</span>
            <span className="text-green-600 text-lg font-bold">
              {order?.totalOrderPrice}EGP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
