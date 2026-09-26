"use client";

import { addAddresses } from "@/Apis/actions/AddressesAction/AddAddresses";
import { getAddress } from "@/Apis/actions/AddressesAction/getAddress";
import { addressSchema } from "@/app/Schema/addressSchema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AddressCard from "./../../_Components/addressCard/addressCard";
import { deleteAddress } from "@/Apis/actions/AddressesAction/deleteAddress";

export interface AddressesFormData {
  details: string;
  phone: string;
  city: string;
  name: string;
}
export interface AddressesData extends AddressesFormData {
  _id: string;
}

export default function AddressesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressesData | null>(
    null,
  );
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<AddressesFormData>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      name: "",
    },
    resolver: zodResolver(addressSchema),
  });

  // Fetch Addresses
  const { data: addressesResponse, isLoading } = useQuery({
    queryKey: ["getAddresses"],
    queryFn: getAddress,
  });

  // التأكد من استخراج مصفوفة العناوين حسب شكل الـ Response القادم من الـ API
  const addresses = addressesResponse?.data || addressesResponse || [];

  // ^ Add Address Mutation
  const { mutate: addAddress, isPending: isAdding } = useMutation({
    mutationFn: addAddresses,
    onSuccess: (responseData) => {
      toast.add({
        type: "success",
        description: responseData?.message || "Address added successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["getAddresses"] });
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.add({
        type: "error",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to add address",
      });
    },
  });

  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    mutationFn: async (formData: AddressesFormData) => {
      if (!editingAddress?._id) return;
      await deleteAddress(editingAddress?._id);
      return addAddresses(formData);
    },
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Address updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["getAddresses"] });
      handleCloseModal();
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Failed to update address",
      });
    },
  });
  const handleOpenEditModal = (address: AddressesData) => {
    setEditingAddress(address);
    reset({
      name: address?.name || "",
      city: address?.city || "",
      details: address?.details || "",
      phone: address?.phone || "",
    });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    reset();
    setIsOpen(false);
  };

  function submitForm(formData: AddressesFormData) {
    if (editingAddress) {
      updateAddress(formData);
    } else {
      addAddress(formData);
    }
  }
  const isSubmitting = isAdding || isUpdating;

  return (
    <main className="flex-1 min-w-0">
      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your saved delivery addresses
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              role="img"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z" />
            </svg>
            Add Address
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && addresses.length === 0 && (
          <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <svg
                className="w-8 h-8 text-gray-400"
                role="img"
                viewBox="0 0 384 512"
                fill="currentColor"
              >
                <path d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Addresses Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Add your first delivery address to make checkout faster and
              easier.
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                role="img"
                viewBox="0 0 448 512"
                fill="currentColor"
              >
                <path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z" />
              </svg>
              Add Your First Address
            </button>
          </div>
        )}

        {/* Address Cards Grid */}
        {!isLoading && addresses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((item: AddressesData) => (
              <AddressCard
                key={item._id}
                address={item}
                onEdit={() => {
                  handleOpenEditModal(item);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200 z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Address
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  role="img"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                >
                  <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z" />
                </svg>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
              {/* Address Name */}
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor={field.name}
                    >
                      Address Name
                      <span className="text-red-500 ml-1 font-bold">*</span>
                    </FieldLabel>
                    <Input
                      type="text"
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Home, Office"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* City */}
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor={field.name}
                    >
                      City
                      <span className="text-red-500 ml-1 font-bold">*</span>
                    </FieldLabel>
                    <Input
                      type="text"
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Cairo"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Full Address */}
              <Controller
                name="details"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor={field.name}
                    >
                      Full Address
                      <span className="text-red-500 ml-1 font-bold">*</span>
                    </FieldLabel>
                    <Textarea
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500 resize-none"
                      {...field}
                      rows={3}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Street, building, apartment..."
                    />
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
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      htmlFor={field.name}
                    >
                      Phone
                      <span className="text-red-500 ml-1 font-bold">*</span>
                    </FieldLabel>
                    <Input
                      type="text"
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500"
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

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-green-600/25 flex items-center justify-center gap-2"
                >
                  {isSubmitting
                    ? editingAddress
                      ? "Updating..."
                      : "Adding..."
                    : editingAddress
                      ? "Update Address"
                      : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
