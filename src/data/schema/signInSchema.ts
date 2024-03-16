import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "This field is required")
  .email("The email address is not valid");

export const signInSchema = z.object({
  email: emailSchema,
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signInResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    isAuthenticated: z.boolean(),
  }),
});

export type SignInResponseData = z.infer<typeof signInResponseSchema>;

export const cookieSchema = z.string().or(z.array(z.string()));