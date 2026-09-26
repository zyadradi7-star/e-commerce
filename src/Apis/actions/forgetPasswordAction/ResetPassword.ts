"use server";

export type ResetPasswordData = {
  email: string;
  newPassword: string;
};

export async function ResetPassword(Values: ResetPasswordData) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Values),
      },
    );

    const payload = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          payload.message ||
          "Failed to reset password. Please check your data.",
      };
    }

    return {
      success: true,
      message: payload.message || "Password reset successfully.",
      data: payload,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Network error. Please try again later.",
    };
  }
}
