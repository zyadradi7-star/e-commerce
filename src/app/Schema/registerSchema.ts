import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name Is Required")
      .min(4, "Min 4 Letter")
      .max(16, "Max 16 Letter"),

    email: zod.string().nonempty("Email Is Required").email("Invalid Email"),
    password: zod
      .string()
      .nonempty("Password Is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Invalid Password",
      ),
    rePassword: zod.string().nonempty("rePassword Is Required"),
    phone: zod
      .string()
      .nonempty("Phone Is Required")
      .regex(/^01[0125][0-9]{8}$/, "Invalid Phone Number"),
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
