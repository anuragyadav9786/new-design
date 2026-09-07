"use server";

import { leadSchema, type LeadData } from "@/features/leads/schema";
import { appendLeadToSheet } from "@/features/leads/service";

export async function captureLead(
  data: LeadData,
): Promise<{ success: boolean; message: string }> {
  const parsed = leadSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  try {
    await appendLeadToSheet(parsed.data);
    return { success: true, message: "Lead captured." };
  } catch (error) {
    console.error("Error saving lead:", error);
    return {
      success: false,
      message: "Could not save your details right now.",
    };
  }
}
