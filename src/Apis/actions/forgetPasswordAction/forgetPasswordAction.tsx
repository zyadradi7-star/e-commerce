"use server";

export type forgetPassData = {
  email: string;
};

export async function ForgetPassword(Values: forgetPassData) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
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
          "Failed to process request. Please check your data.",
      };
    }

    return {
      success: true,
      message: payload.message || "Reset code sent successfully.",
      data: payload,
    };
  } catch (error: any) {
    // 4. Catch network or unexpected execution errors
    return {
      success: false,
      message: error.message || "Network error. Please try again later.",
    };
  }
}
