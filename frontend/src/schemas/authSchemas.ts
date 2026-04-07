import { z } from "zod";

export const completeProfileSchema = z.object({
  universityRollNo: z.string().min(1, "University roll no is required"),
  college: z.string().min(1, "College is required"),
  branch: z.string().min(1, "Branch is required"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number is too long"),
});

export type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>;
