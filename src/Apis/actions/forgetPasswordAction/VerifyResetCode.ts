"use server";

export type VerifyResetCodeData = {
  resetCode: string;
};

export async function verifyResetCode(Values: VerifyResetCodeData) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
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
          "Invalid or expired reset code. Please check your code.",
      };
    }

    return {
      success: true,
      message: payload.message || "Reset code verified successfully.",
      data: payload,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Network error. Please try again later.",
    };
  }
}
