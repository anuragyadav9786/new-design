import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  goal: z.string().trim().min(1).max(100),
  source: z.string().trim().min(1).max(100),
});

export type LeadData = z.infer<typeof leadSchema>;
