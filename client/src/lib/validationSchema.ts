// src/libs/validationSchemas.ts
import { z } from "zod";

// Existing registerSchema
export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Email is not valid"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// New signinSchema
export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is not valid"),
  password: z.string().min(1, "Password is required"),
});

// Optional: Export types
export type SignInFormData = z.infer<typeof signinSchema>;
