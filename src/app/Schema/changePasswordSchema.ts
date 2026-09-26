import * as zod from "zod";

export const ChangePasswordSchema = zod
  .object({
    currentPassword: zod
      .string()
      .min(6, "Current password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Invalid password format",
      ),
    password: zod
      .string()
      .min(6, "Password password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Invalid Password",
      ),
    rePassword: zod.string().min(6, "Confirm password is required"),
  })
  .refine(
    (obj) => {
      if (obj.password === obj.rePassword) {
        return true;
      } else {
        return false;
      }
    },
    { path: ["rePassword"], message: "Password and rePassword Not Match" },
  );
