import * as zod from "zod";

export const checkOutSchema = zod.object({
  city: zod
    .string()
    .nonempty("City Is Required")
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name must be less than 50 characters"),

  details: zod
    .string()
    .nonempty("Street Address Is Required")
    .min(10, "Address details must be at least 10 characters")
    .max(200, "Address details must be less than 200 characters"),

  phone: zod
    .string()
    .nonempty("Phone Is Required")
    .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  postalCode: zod
    .string()
    .min(1, "Postal code is required")
    .regex(/^[0-9]{5}$/, "Postal code must be 5 digits"),
});
