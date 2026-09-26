import ChangePassComp from "@/app/_Components/ChangePassComp/ChangePassComp";
import ProfileInformationComp from "@/app/_Components/profileInformationComp/profileInformationComp";
import React from "react";

export default function settingsPage() {
  return (
    <>
      <main className="flex-1 min-w-0">
        <div className="space-y-6">
          {/* header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Account Settings
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Update your profile information and change your password
            </p>
          </div>
          {/* Profile Information */}
          <ProfileInformationComp />

          {/* Change Password */}
          <ChangePassComp />
        </div>
      </main>
    </>
  );
}
