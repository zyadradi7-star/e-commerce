"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { checkOutSchema } from "../Schema/checkoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { payCash } from "@/Apis/actions/payment/payCastAction";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { payOnline } from "@/Apis/actions/payment/payOnlineAction";
import { useQuery } from "@tanstack/react-query";
import { CartResponseData } from "@/Apis/Types/CartType";
export interface shippingData {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}
type PaymentMethod = "cash" | "card";
export default function ChecKoutComp({ cartId }: { cartId: string }) {
  const { data: CartData, isLoading } = useQuery<CartResponseData>({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed To Fetch");
      return response.json();
    },
  });
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, control, handleSubmit } = useForm<shippingData>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
    resolver: zodResolver(checkOutSchema),
  });

  async function submitForm(data: shippingData) {
    setIsSubmitting(true);
    try {
      if (paymentMethod === "cash") {
        const payLoad = await payCash(cartId, data);

        if (payLoad?.status === "success") {
          toast.add({
            type: "success",
            description: "Order created successfully!",
          });
          router.push("/");
        } else {
          toast.add({
            type: "error",
            description: "Order creation failed. Please try again.",
          });
        }
      } else {
        const payLoad = await payOnline(cartId, data);
        if (payLoad?.session?.url) window.location.href = payLoad?.session?.url;
        toast.add({
          type: "info",
          description: "Redirecting to secure payment gateway...",
        });
      }
    } catch (error) {
      toast.add({
        type: "error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* headers */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link className="hover:text-green-600 transition" href="/">
                Home
              </Link>
              <span className="text-gray-300">/</span>
              <Link className="hover:text-green-600 transition" href="/cart">
                Cart
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Checkout</span>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="bg-linear-to-br from-green-600 to-green-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/20">
                    <svg
                      data-prefix="fas"
                      data-icon="receipt"
                      className="svg-inline--fa w-6 h-6 fa-receipt"
                      role="img"
                      viewBox="0 0 384 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.2-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6S384 14.6 384 24l0 464c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6l-40.4-34.6-40.4 34.6c-9 7.7-22.2 7.7-31.2 0l-40.4-34.6-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488L0 24C0 14.6 5.5 6.1 14 2.2zM104 136c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0zM80 352c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24zm24-120c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0z"
                      />
                    </svg>
                  </span>
                  Complete Your Order
                </h1>
                <p className="text-gray-500 mt-2">
                  Review your items and complete your purchase
                </p>
              </div>

              <Link
                className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all"
                href="/cart"
              >
                <svg
                  data-prefix="fas"
                  data-icon="arrow-left"
                  className="svg-inline--fa w-4 h-4 fa-arrow-left"
                  role="img"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                  />
                </svg>
                Back to Cart
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* left side  */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Information */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  {/* header */}
                  <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <svg
                        data-prefix="fas"
                        data-icon="house"
                        className="svg-inline--fa w-4 h-4 fa-house"
                        role="img"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z"
                        />
                      </svg>
                      Shipping Address
                    </h2>
                    <p className="text-green-100 text-sm mt-1">
                      Where should we deliver your order?
                    </p>
                  </div>
                  {/* body */}
                  <div className="p-6 space-y-5">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <svg
                          data-prefix="fas"
                          data-icon="circle-info"
                          className="svg-inline--fa fa-circle-info w-4 h-4 text-blue-600 "
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium">
                          Delivery Information
                        </p>
                        <p className="text-xs text-blue-600 mt-0.5">
                          Please ensure your address is accurate for smooth
                          delivery
                        </p>
                      </div>
                    </div>

                    {/* City */}
                    <Controller
                      name="city"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            className="block text-sm font-semibold text-gray-700 mb-2"
                            htmlFor={field.name}
                          >
                            City
                            <span className="text-red-500 ml-1 font-bold">
                              *
                            </span>
                          </FieldLabel>
                          <div className="relative">
                            <div className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                              <svg
                                data-prefix="fas"
                                data-icon="city"
                                className="svg-inline--fa fa-city text-gray-500 w-4 h-4"
                                role="img"
                                viewBox="0 0 576 512"
                                aria-hidden="true"
                              >
                                <path
                                  fill="currentColor"
                                  d="M320 0c-35.3 0-64 28.7-64 64l0 32-48 0 0-72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 72-64 0 0-72C96 10.7 85.3 0 72 0S48 10.7 48 24l0 74c-27.6 7.1-48 32.2-48 62L0 448c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-64 0 0-128c0-35.3-28.7-64-64-64L320 0zm64 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zm-16 80c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zm16 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zm112-16c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 304l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM240 192c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM128 304l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM112 192c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0z"
                                />
                              </svg>
                            </div>
                            <Input
                              type="text"
                              className=" h-auto w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none! transition-all border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-100!"
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter your Details"
                              autoComplete="on"
                            />
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Street Address * */}
                    <Controller
                      name="details"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            className="block text-sm font-semibold text-gray-700 mb-2"
                            htmlFor={field.name}
                          >
                            Street Address
                            <span className="text-red-500 ml-1 font-bold">
                              *
                            </span>
                          </FieldLabel>
                          <div className="relative">
                            <div className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                              <svg
                                data-prefix="fas"
                                data-icon="location-dot"
                                className="svg-inline--fa fa-location-dot text-gray-500 w-4 h-4"
                                role="img"
                                viewBox="0 0 384 512"
                                aria-hidden="true"
                              >
                                <path
                                  fill="currentColor"
                                  d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
                                />
                              </svg>
                            </div>
                            <Textarea
                              className=" resize-non h-auto w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none! transition-all border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-100!"
                              {...field}
                              rows={3}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Street name, building number, floor, apartment..."
                              autoComplete="on"
                            />
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    {/* Phone */}
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            className="block text-sm font-semibold text-gray-700 mb-2"
                            htmlFor={field.name}
                          >
                            Phone
                            <span className="text-red-500 ml-1 font-bold">
                              *
                            </span>
                          </FieldLabel>
                          <div className="relative">
                            <div className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                              <svg
                                data-prefix="fas"
                                data-icon="phone"
                                className="svg-inline--fa fa-phone text-gray-500 w-4 h-4"
                                role="img"
                                viewBox="0 0 512 512"
                                aria-hidden="true"
                              >
                                <path
                                  fill="currentColor"
                                  d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"
                                />
                              </svg>
                            </div>
                            <Input
                              type="text"
                              className=" h-auto w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none! transition-all border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-100!"
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter your Phone"
                              autoComplete="on"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                              Egyptian numbers only
                            </span>
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* postalCode */}
                    <Controller
                      name="postalCode"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            className="block text-sm font-semibold text-gray-700 mb-2"
                            htmlFor={field.name}
                          >
                            postalCode
                            <span className="text-red-500 ml-1 font-bold">
                              *
                            </span>
                          </FieldLabel>
                          <div className="relative">
                            <div className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className=" text-gray-500 w-4 h-4"
                              >
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                              </svg>
                            </div>
                            <Input
                              type="text"
                              className=" h-auto w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none! transition-all border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-100!"
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter your postalCode"
                              autoComplete="on"
                            />
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                {/* Payment Method
                 */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  {/* header */}
                  <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <svg
                        data-prefix="fas"
                        data-icon="wallet"
                        className="svg-inline--fa w-4 h-4 fa-wallet"
                        role="img"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64L72 128c-13.3 0-24-10.7-24-24S58.7 80 72 80l384 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L64 32zM416 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                        />
                      </svg>
                      Payment Method
                    </h2>
                    <p className="text-green-100 text-sm mt-1">
                      Choose how you'd like to pay
                    </p>
                  </div>
                  {/* body */}
                  <div className="p-6 space-y-4">
                    <button
                      onClick={() => setPaymentMethod("cash")}
                      type="button"
                      className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group cursor-pointer ${
                        paymentMethod === "cash"
                          ? "border-green-600 bg-green-50/50"
                          : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                          paymentMethod === "cash"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                        }`}
                      >
                        <svg
                          data-prefix="fas"
                          data-icon="money-bill"
                          className="svg-inline--fa fa-money-bill w-5 h-5"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm192 24c0 4.4-3.6 8.1-8 7.5-29-3.6-51.9-26.6-55.5-55.5-.5-4.4 3.1-8 7.5-8l48 0c4.4 0 8 3.6 8 8l0 48zM64 328c0-4.4 3.6-8.1 8-7.5 29 3.6 51.9 26.6 55.5 55.5 .5 4.4-3.1 8-7.5 8l-48 0c-4.4 0-8-3.6-8-8l0-48zm8-136.5c-4.4 .5-8-3.1-8-7.5l0-48c0-4.4 3.6-8 8-8l48 0c4.4 0 8.1 3.6 7.5 8-3.6 29-26.6 51.9-55.5 55.5zm368 129c4.4-.5 8 3.1 8 7.5l0 48c0 4.4-3.6 8-8 8l-48 0c-4.4 0-8.1-3.6-7.5-8 3.6-29 26.6-51.9 55.5-55.5z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-700">
                          Cash on Delivery
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Pay when your order arrives at your doorstep
                        </p>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 ${
                          paymentMethod === "cash"
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-gray-200"
                        }`}
                      >
                        {paymentMethod === "cash" && (
                          <svg
                            data-prefix="fas"
                            data-icon="check"
                            className="svg-inline--fa fa-check w-4 h-4"
                            role="img"
                            viewBox="0 0 448 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                    {/* Card Option */}
                    <button
                      onClick={() => setPaymentMethod("card")}
                      type="button"
                      className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-green-600bg-gradient-to-r from-green-50 to-blue-50 shadow-sm"
                          : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                      } `}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                          paymentMethod === "card"
                            ? "bg-linear-to-br from-green-500 to-blue-600 shadow-lg shadow-green-500/30 text-white"
                            : " bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                        }`}
                      >
                        <svg
                          data-prefix="fas"
                          data-icon="credit-card"
                          className="svg-inline--fa fa-credit-card w-4 h-4"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M0 128l0 32 512 0 0-32c0-35.3-28.7-64-64-64L64 64C28.7 64 0 92.7 0 128zm0 80L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-176-512 0zM64 360c0-13.3 10.7-24 24-24l48 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-48 0c-13.3 0-24-10.7-24-24zm144 0c0-13.3 10.7-24 24-24l64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0c-13.3 0-24-10.7-24-24z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-900">Pay Online</h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Secure payment with Credit/Debit Card via Stripe
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <img
                            alt="Visa"
                            className="h-5"
                            src="https://img.icons8.com/color/48/visa.png"
                          />
                          <img
                            alt="Mastercard"
                            className="h-5"
                            src="https://img.icons8.com/color/48/mastercard.png"
                          />
                          <img
                            alt="Amex"
                            className="h-5"
                            src="https://img.icons8.com/color/48/amex.png"
                          />
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 ${
                          paymentMethod === "card"
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-gray-200"
                        }`}
                      >
                        {paymentMethod === "card" && (
                          <svg
                            data-prefix="fas"
                            data-icon="check"
                            className="svg-inline--fa fa-check w-4 h-4"
                            role="img"
                            viewBox="0 0 448 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                    <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <svg
                          data-prefix="fas"
                          data-icon="shield-halved"
                          className="svg-inline--fa fa-shield-halved w-4 h-4 text-green-600"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Secure &amp; Encrypted
                        </p>
                        <p className="text-xs text-green-600 mt-0.5">
                          Your payment info is protected with 256-bit SSL
                          encryption
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* right side */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                  <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <svg
                        data-prefix="fas"
                        data-icon="bag-shopping"
                        className="svg-inline--fa fa-bag-shopping w-4 h-4"
                        role="img"
                        viewBox="0 0 448 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M160 80c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 384c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48c0-61.9-50.1-112-112-112S112 18.1 112 80l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                        />
                      </svg>
                      Order Summary
                    </h2>
                    <p className="text-green-100 text-sm mt-1">
                      {" "}
                      {CartData?.numOfCartItems}{" "}
                      {CartData?.numOfCartItems === 1 ? "item" : "items"}{" "}
                    </p>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                      {CartData?.data.products.map((prod) => {
                        return (
                          <>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                              <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                                <img
                                  alt={prod?.product?.title}
                                  className="w-full h-full object-contain"
                                  src={prod?.product?.imageCover}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {prod?.product?.category?.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {prod?.count} × {prod?.price} EGP
                                </p>
                              </div>
                              <p className="text-sm font-bold text-gray-900 shrink-0">
                                {prod.price}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <hr className="border-gray-100 my-4" />
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">
                          {CartData?.data.totalCartPrice} EGP
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="flex items-center gap-2">
                          <svg
                            data-prefix="fas"
                            data-icon="truck"
                            className="svg-inline--fa fa-truck text-gray-400 w-4 h-4"
                            role="img"
                            viewBox="0 0 576 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                            />
                          </svg>
                          Shipping
                        </span>
                        <span className="text-green-600 font-semibold">
                          FREE
                        </span>
                      </div>
                      <hr className="border-gray-100" />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          Total
                        </span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-green-600">
                            {CartData?.data.totalCartPrice}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>

                    {paymentMethod === "cash" ? (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-6"
                      >
                        {isSubmitting ? (
                          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <svg
                              data-prefix="fas"
                              data-icon="box"
                              className="svg-inline--fa fa-box w-4 h-4"
                              role="img"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"
                              />
                            </svg>
                            <span>Place Order Now</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-6 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <svg
                              data-prefix="fas"
                              data-icon="shield-halved"
                              className="svg-inline--fa fa-shield-halved w-4 h-4"
                              role="img"
                              viewBox="0 0 512 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"
                              />
                            </svg>
                            Proceed to Payment
                          </>
                        )}
                      </button>
                    )}
                    <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg
                          data-prefix="fas"
                          data-icon="shield-halved"
                          className="svg-inline--fa fa-shield-halved text-green-500 w-4 h-4"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"
                          />
                        </svg>
                        <span>Secure</span>
                      </div>
                      <div className="w-px h-4 bg-gray-200" />
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg
                          data-prefix="fas"
                          data-icon="truck"
                          className="svg-inline--fa fa-truck text-blue-500 w-4 h-4"
                          role="img"
                          viewBox="0 0 576 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                          />
                        </svg>
                        <span>Fast Delivery</span>
                      </div>
                      <div className="w-px h-4 bg-gray-200" />
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg
                          data-prefix="fas"
                          data-icon="box"
                          className="svg-inline--fa fa-box text-orange-500 w-4 h-4"
                          role="img"
                          viewBox="0 0 448 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"
                          />
                        </svg>
                        <span>Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
