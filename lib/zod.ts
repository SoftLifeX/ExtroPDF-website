import { z } from "zod";

export const emailSchema = z
  .string()
  .email({ message: "Invalid email format" });

export const signInSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signUpSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
