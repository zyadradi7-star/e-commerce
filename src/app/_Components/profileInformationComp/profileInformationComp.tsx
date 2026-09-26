"use client";

import { updateUserData } from "@/Apis/Services/UpdateUserData";
import { ChangePasswordSchema } from "@/app/Schema/changePasswordSchema";
import { updateUserDataSchema } from "@/app/Schema/updateUserDataSchema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

export default function ProfileInformationComp() {
  const { control, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(updateUserDataSchema),
  });

  const {
    mutate: UpdateUserData,
    isPending: isUpdating,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Profile Data Updated successfully",
      });
      reset();
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Failed to Update Profile Data",
      });
    },
  });

  function submitForm(values: ProfileFormData) {
    UpdateUserData(values);
  }
  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <svg
                data-prefix="fas"
                data-icon="user"
                className="svg-inline--fa fa-user w-5 h-5 text-green-600"
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200">
              Profile Updated successfully
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200">
              {(error as any)?.response?.data?.message ||
                "An error occurred while updating Profile Data."}
            </div>
          )}
          {/* form */}

          <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="block text-sm font-semibold text-gray-700 mb-1"
                    htmlFor={field.name}
                  >
                    Full Name
                  </FieldLabel>
                  <Input
                    type="text"
                    className="w-full h-auto px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-500/20! outline-none! transition-all"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Name"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="block text-sm font-semibold text-gray-700 mb-1"
                    htmlFor={field.name}
                  >
                    Email Address
                  </FieldLabel>
                  <Input
                    type="email"
                    className="w-full h-auto px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-500/20! outline-none! transition-all"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Email"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="block text-sm font-semibold text-gray-700 mb-1"
                    htmlFor={field.name}
                  >
                    Phone Number
                  </FieldLabel>
                  <Input
                    type="text"
                    className="w-full h-auto px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-500/20! outline-none! transition-all"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="01xxxxxxxxx"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <button
              disabled={isUpdating}
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-lg shadow-green-600/25"
            >
              {isUpdating ? (
                "Saving...."
              ) : (
                <>
                  <svg
                    data-prefix="fas"
                    data-icon="floppy-disk"
                    className="svg-inline--fa fa-floppy-disk w-4 h-4"
                    role="img"
                    viewBox="0 0 448 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm32 96c0-17.7 14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-160 0c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                    />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
