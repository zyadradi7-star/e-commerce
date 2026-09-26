import * as zod from "zod";

export const updateUserDataSchema = zod.object({
  name: zod
    .string()
    .nonempty("Name Is Required")
    .min(4, "Min 4 Letter")
    .max(16, "Max 16 Letter"),

  email: zod.string().nonempty("Email Is Required").email("Invalid Email"),

  phone: zod
    .string()
    .nonempty("Phone Is Required")
    .regex(/^01[0125][0-9]{8}$/, "Invalid Phone Number"),
});
