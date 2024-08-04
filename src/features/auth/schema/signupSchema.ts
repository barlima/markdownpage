import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().min(1, "Email is required.").email("Invalid email."),
    password: z.string().min(8, "Minimum password length is 8."),
    passwordConfirmation: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["passwordConfirmation"],
      });
    }
  });

export type SignupSchema = z.infer<typeof signupSchema>;
