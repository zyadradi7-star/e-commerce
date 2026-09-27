"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import * as zod from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";
import { redirect, useRouter } from "next/navigation";
import { loginSchema } from "./../../Schema/loginSchema";
import { signIn } from "next-auth/react";
import img1 from "../../../assets/images/FreshCart.png";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export type loginData = zod.infer<typeof loginSchema>;

export default function Login() {
  const [showNew, setShowNew] = useState(false);

  const navigate = useRouter();
  const { register, control, handleSubmit } = useForm<loginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  async function submitForm(data: loginData) {
    const isLogin = await signIn("credentials", { ...data, redirect: false });
    console.log(data);

    if (isLogin?.ok) {
      // success , navigate
      toast.add({
        type: "success",
        description: "Success Login",
      });
      navigate.push("/");
    } else {
      //
      toast.add({
        type: "error",
        description: "Can't Login Now",
      });
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-7xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div></div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with Google</span>
                  </button>
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                    <div className="bg-white p-1 rounded-full">
                      <svg className="w-6" viewBox="0 0 32 32">
                        <path
                          fillRule="evenodd"
                          d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with GitHub</span>
                  </button>
                </div>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign In with e-mail
                  </div>
                </div>{" "}
                {/* Form */}
                <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                  {" "}
                  <div className=" flex flex-col gap-5">
                    {/* Email */}
                    <Controller
                      name="email"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            className="font-bold"
                            htmlFor={field.name}
                          >
                            Email
                          </FieldLabel>
                          <div className="relative">
                            <Input
                              type="email"
                              className="w-full h-auto px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none! focus:border-green-500! focus:ring-2! focus:ring-green-100! transition-all"
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter your Email"
                              autoComplete="on"
                            />
                            <svg
                              data-prefix="fas"
                              data-icon="envelope"
                              className="svg-inline--fa fa-envelope h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              role="img"
                              viewBox="0 0 512 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"
                              />
                            </svg>
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    {/* password */}
                    <Controller
                      name="password"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            className="block text-sm font-semibold text-gray-700 mb-1"
                            htmlFor={field.name}
                          >
                            Password
                          </FieldLabel>
                          <div className="relative">
                            <Input
                              type={showNew ? "text" : "password"}
                              className="w-full h-auto px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-500/20! pl-10 outline-none! transition-all"
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter your new password"
                            />
                            <svg
                              data-prefix="fas"
                              data-icon="lock"
                              className="svg-inline--fa fa-lock w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              role="img"
                              viewBox="0 0 384 512"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"
                              />
                            </svg>
                            <button
                              onClick={() => setShowNew(!showNew)}
                              type="button"
                              aria-label="Toggle new password visibility"
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showNew ? (
                                <FaEyeSlash className="w-4 h-4" />
                              ) : (
                                <FaEye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 h-auto text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed "
                  >
                    Login Now
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat rounded-2xl"
              style={{
                backgroundImage: `url(${img1.src})`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
