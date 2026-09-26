import * as zod from "zod";

export const forgetPassSchema = zod.object({
  email: zod.string().nonempty("Email Is Required").email("Invalid Email"),
});
export type forgetPassData = zod.infer<typeof forgetPassSchema>;
