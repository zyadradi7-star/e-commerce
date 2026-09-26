import * as zod from "zod";

export const ResetPasswordSchema = zod
  .object({
    password: zod
      .string()
      .min(1, "Password Is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters",
      ),
    rePassword: zod.string().nonempty("rePassword Is Required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
export type resetPasswordData = zod.infer<typeof ResetPasswordSchema>;
