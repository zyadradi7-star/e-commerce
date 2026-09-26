"use client";

import { ChangePassword } from "@/Apis/Services/ChangePassword";
import { ChangePasswordSchema } from "@/app/Schema/changePasswordSchema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export interface changePasswordFormData {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export default function ChangePassComp() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { control, handleSubmit, reset } = useForm<changePasswordFormData>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(ChangePasswordSchema),
  });

  const {
    mutate: ChangePassFnc,
    isPending: isChanging,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ChangePassword,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Password changed successfully",
      });
      reset();
    },
    onError: (err: any) => {
      toast.add({
        type: "error",
        description:
          err?.response?.data?.message || "Failed to change password",
      });
    },
  });

  function submitForm(values: changePasswordFormData) {
    ChangePassFnc(values);
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
            <FaLock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Change Password</h3>
            <p className="text-sm text-gray-500">
              Update your account password
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {isSuccess && (
          <div className="mb-6 p-4 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            Password changed successfully
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200">
            {(error as any)?.response?.data?.message ||
              "An error occurred while changing password."}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
          {/* Current Password */}
          <Controller
            name="currentPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="block text-sm font-semibold text-gray-700 mb-1"
                  htmlFor={field.name}
                >
                  Current Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    type={showCurrent ? "text" : "password"}
                    className="w-full h-auto px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-500/20! outline-none! transition-all"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your current password"
                  />
                  <button
                    onClick={() => setShowCurrent(!showCurrent)}
                    type="button"
                    aria-label="Toggle current password visibility"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrent ? (
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

          {/* New Password */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="block text-sm font-semibold text-gray-700 mb-1"
                  htmlFor={field.name}
                >
                  New Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    type={showNew ? "text" : "password"}
                    className="w-full h-auto px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-500/20! outline-none! transition-all"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your new password"
                  />
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

          {/* Confirm Password */}
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="block text-sm font-semibold text-gray-700 mb-1"
                  htmlFor={field.name}
                >
                  Confirm New Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    className="w-full h-auto px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-500/20! outline-none! transition-all"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your new password"
                  />
                  <button
                    onClick={() => setShowConfirm(!showConfirm)}
                    type="button"
                    aria-label="Toggle confirm password visibility"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? (
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isChanging}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 shadow-lg shadow-orange-600/25 cursor-pointer"
          >
            {isChanging ? (
              <>
                <ClipLoader color="#ffffff" size={18} />
                <span>Changing...</span>
              </>
            ) : (
              <>
                <FaLock className="w-4 h-4" />
                <span>Change Password</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
