import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(2, "Username is required"),
  universityRollNo: z.string().min(1, "University roll no is required"),
  college: z.string().min(1, "College is required"),
  branch: z.string().min(1, "Branch is required"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number is too long"),
});

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP is required")
    .max(8, "OTP looks invalid"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
