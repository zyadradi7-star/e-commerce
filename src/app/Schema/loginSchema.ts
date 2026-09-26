import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.string().nonempty("Email Is Required").email("Invalid Email"),
  password: zod
    .string()
    .nonempty("Password Is Required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Invalid Password",
    ),
});
