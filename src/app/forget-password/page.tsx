"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  IoMail,
  IoKeySharp,
  IoLockClosedSharp,
  IoShieldCheckmark,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import img from "../../assets/images/forgetPassword.png";
import { useMutation } from "@tanstack/react-query";

// Schemas & Actions
import {
  forgetPassData,
  forgetPassSchema,
} from "../Schema/forgetPasswordSchmea";
import { ForgetPassword } from "@/Apis/actions/forgetPasswordAction/forgetPasswordAction";
import {
  resetPasswordData,
  ResetPasswordSchema,
} from "../Schema/resetPasswordSchema";
import { verifyCodeData, verifyCodeSchema } from "../Schema/VerifyCodeSchema";
import { verifyResetCode } from "@/Apis/actions/forgetPasswordAction/VerifyResetCode";
import { ResetPassword } from "@/Apis/actions/forgetPasswordAction/ResetPassword";

export default function ForgetPasswordPage() {
  const router = useRouter();

  // ^ حالة التحكم بالخطوات (1: الإيميل | 2: كود التحقق | 3: كلمة المرور الجديدة)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  //  Form إرسال البريد
  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    getValues: getEmailValues,
  } = useForm<forgetPassData>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgetPassSchema),
  });

  //  Form التحقق من الكود
  const {
    control: codeControl,
    handleSubmit: handleCodeSubmit,
    reset: resetCodeForm,
  } = useForm<verifyCodeData>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(verifyCodeSchema),
  });

  //  Form كلمة المرور الجديدة وتأكيدها
  const { control: passwordControl, handleSubmit: handlePasswordSubmit } =
    useForm<resetPasswordData>({
      defaultValues: { password: "", rePassword: "" },
      resolver: zodResolver(ResetPasswordSchema),
    });

  //  Mutation إرسال كود التعيين للإيميل
  const { mutate: ForgetPasswordFnc, isPending: isSendingEmail } = useMutation({
    mutationFn: ForgetPassword,
    onSuccess: () => {
      setStep(2);
      toast.add({
        type: "success",
        description: "Reset code sent to your email successfully",
      });
    },
    onError: (err: any) => {
      toast.add({
        type: "error",
        description:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to send reset code",
      });
    },
  });

  //  Mutation التحقق من صحة الكود
  const { mutate: VerifyCodeFnc, isPending: isVerifying } = useMutation({
    mutationFn: verifyResetCode,
    onSuccess: (res) => {
      if (res.success) {
        toast.add({
          type: "success",
          description: "Code verified successfully!",
        });
        setStep(3);
      } else {
        toast.add({
          type: "error",
          description: res.message,
        });
      }
    },
    onError: (err: any) => {
      toast.add({
        type: "error",
        description: err?.message || "Invalid or expired code",
      });
    },
  });

  //  Mutation تعيين كلمة المرور الجديدة
  const { mutate: ResetPasswordFnc, isPending: isResetting } = useMutation({
    mutationFn: (vals: resetPasswordData) =>
      ResetPassword({
        email: getEmailValues("email"),
        newPassword: vals.password,
      }),
    onSuccess: (res: any) => {
      if (res?.success || res?.token) {
        toast.add({
          type: "success",
          description: "Password reset successfully! Redirecting to login...",
        });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.add({
          type: "error",
          description: res?.message || "Failed to reset password",
        });
      }
    },
    onError: (err: any) => {
      toast.add({
        type: "error",
        description: err?.message || "Failed to reset password",
      });
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-7xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        {/* الجانب الأيسر - الفورم */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <div className="text-2xl xl:text-3xl font-extrabold text-gray-800">
              <span className="text-green-600">Fresh</span>Cart
            </div>

            <div className="w-full flex-1 mt-8">
              {/* العنوان والوصف حسب الخطوة الحالية */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {step === 1 && "Forgot Password?"}
                  {step === 2 && "Check Your Email"}
                  {step === 3 && "Set New Password"}
                </h1>
                <p className="text-gray-600 text-sm">
                  {step === 1 && "No worries, we'll send you a reset code"}
                  {step === 2 && (
                    <>
                      Enter the 6-digit code sent to{" "}
                      <span className="font-semibold text-gray-800">
                        {getEmailValues("email")}
                      </span>
                    </>
                  )}
                  {step === 3 && "Create a new password for your account"}
                </p>
              </div>

              {/* شريط الخطوات (Stepper) */}
              <div className="flex items-center justify-center my-8">
                {/* Step 1: Email */}
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step > 1
                        ? "bg-green-100 text-green-600"
                        : "bg-green-600 text-white ring-4 ring-green-100"
                    }`}
                  >
                    {step > 1 ? (
                      <IoCheckmarkCircleSharp className="text-xl" />
                    ) : (
                      <IoMail />
                    )}
                  </div>
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      step > 1 ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                </div>

                {/* Step 2: Code Verification */}
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      step === 2
                        ? "bg-green-600 text-white ring-4 ring-green-100"
                        : step > 2
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step > 2 ? (
                      <IoCheckmarkCircleSharp className="text-xl" />
                    ) : (
                      <IoKeySharp />
                    )}
                  </div>
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      step > 2 ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                </div>

                {/* Step 3: New Password */}
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      step === 3
                        ? "bg-green-600 text-white ring-4 ring-green-100"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <IoLockClosedSharp />
                  </div>
                </div>
              </div>

              {/* Step 1: إدخال البريد الإلكتروني */}
              {step === 1 && (
                <form
                  onSubmit={handleEmailSubmit((vals) =>
                    ForgetPasswordFnc(vals),
                  )}
                  className="space-y-4"
                >
                  <Controller
                    name="email"
                    control={emailControl}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="font-bold" htmlFor={field.name}>
                          Email Address
                        </FieldLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <IoMail className="text-xl" />
                          </div>
                          <Input
                            type="email"
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your Email Address"
                            autoComplete="on"
                            className="border-gray-300 focus:ring-2 h-auto focus:ring-green-200! focus-visible:border-green-500! transition-all focus:outline-none! py-3 pl-12! pr-4"
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button
                    disabled={isSendingEmail}
                    type="submit"
                    className="bg-green-500 w-full h-auto hover:bg-green-600 cursor-pointer font-bold text-md mt-3 mb-6 py-3 px-4 shadow-lg hover:shadow-xl"
                  >
                    {isSendingEmail ? "Sending Code..." : "Send Reset Code"}
                  </Button>

                  <div className="text-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      <FaArrowLeftLong />
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              )}

              {/* Step 2: إدخال كود التحقق */}
              {step === 2 && (
                <form
                  onSubmit={handleCodeSubmit((vals) => VerifyCodeFnc(vals))}
                  className="space-y-4"
                >
                  <Controller
                    name="resetCode"
                    control={codeControl}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="font-bold" htmlFor={field.name}>
                          Verification Code
                        </FieldLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <IoShieldCheckmark className="text-xl" />
                          </div>
                          <Input
                            type="text"
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter 6-digit code"
                            maxLength={6}
                            className="border-gray-300 focus:ring-2 h-auto focus:ring-green-200! focus-visible:border-green-500! transition-all focus:outline-none! py-3 pl-12! pr-4 tracking-widest text-center text-lg font-bold"
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button
                    disabled={isVerifying}
                    type="submit"
                    className="bg-green-500 w-full h-auto hover:bg-green-600 cursor-pointer font-bold text-md mt-3 mb-4 py-3 px-4 shadow-lg hover:shadow-xl"
                  >
                    {isVerifying ? "Verifying..." : "Verify Code"}
                  </Button>

                  <div className="flex flex-col gap-2 text-center pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        ForgetPasswordFnc({ email: getEmailValues("email") })
                      }
                      disabled={isSendingEmail}
                      className="text-sm text-green-600 hover:underline font-medium disabled:opacity-50 border-none bg-transparent cursor-pointer"
                    >
                      {isSendingEmail
                        ? "Resending code..."
                        : "Didn't receive the code? Resend"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        resetCodeForm();
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700 underline border-none bg-transparent cursor-pointer"
                    >
                      Use a different email address
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: تعيين كلمة المرور الجديدة وتأكيدها */}
              {step === 3 && (
                <form
                  onSubmit={handlePasswordSubmit((vals) =>
                    ResetPasswordFnc(vals),
                  )}
                  className="space-y-4"
                >
                  <Controller
                    name="password"
                    control={passwordControl}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="font-bold" htmlFor={field.name}>
                          New Password
                        </FieldLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <IoLockClosedSharp className="text-xl" />
                          </div>
                          <Input
                            type="password"
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter new password"
                            className="border-gray-300 focus:ring-2 h-auto focus:ring-green-200! focus-visible:border-green-500! transition-all focus:outline-none! py-3 pl-12! pr-4"
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="rePassword"
                    control={passwordControl}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="font-bold" htmlFor={field.name}>
                          Confirm Password
                        </FieldLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <IoLockClosedSharp className="text-xl" />
                          </div>
                          <Input
                            type="password"
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Confirm new password"
                            className="border-gray-300 focus:ring-2 h-auto focus:ring-green-200! focus-visible:border-green-500! transition-all focus:outline-none! py-3 pl-12! pr-4"
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button
                    disabled={isResetting}
                    type="submit"
                    className="bg-green-500 w-full h-auto hover:bg-green-600 cursor-pointer font-bold text-md mt-3 mb-6 py-3 px-4 shadow-lg hover:shadow-xl"
                  >
                    {isResetting ? "Resetting Password..." : "Reset Password"}
                  </Button>
                </form>
              )}

              <div className="text-center mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <Link
                    className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                    href="/login"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* الجانب الأيمن - الصورة والنصوص */}
        <div className="flex-1 bg-[#F8FAFC] text-center hidden lg:flex flex-col justify-center items-center px-12 py-16">
          <div
            className="w-full flex-1 max-h-87.5 bg-contain bg-center bg-no-repeat mb-12"
            style={{
              backgroundImage: `url(${img.src})`,
            }}
          ></div>

          <div className="max-w-lg">
            <h2 className="text-[28px] font-bold text-[#1e293b] mb-4">
              Reset Your Password
            </h2>
            <p className="text-[#64748b] text-base mb-8 leading-relaxed px-4">
              Don't worry, it happens to the best of us. We'll help you get back
              into your account in no time.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="flex items-center gap-2 text-[#475569] font-medium">
                <IoMail className="text-green-600 text-xl" />
                <span className="text-sm">Email Verification</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569] font-medium">
                <IoShieldCheckmark className="text-green-600 text-xl" />
                <span className="text-sm">Secure Reset</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569] font-medium">
                <IoLockClosedSharp className="text-green-600 text-xl" />
                <span className="text-sm">Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
