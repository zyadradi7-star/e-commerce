import * as zod from "zod";

export const verifyCodeSchema = zod.object({
  resetCode: zod
    .string()
    .min(1, "Reset code is required")
    .min(6, "Reset code must be at least 6 digits"),
});
export type verifyCodeData = zod.infer<typeof verifyCodeSchema>;
