import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import type { LeadData } from "./schema";

export async function appendLeadToSheet(data: LeadData) {
  const {
    GOOGLE_SHEETS_CLIENT_EMAIL,
    GOOGLE_SHEETS_PRIVATE_KEY,
    GOOGLE_SHEET_ID,
  } = process.env;

  if (
    !GOOGLE_SHEETS_CLIENT_EMAIL ||
    !GOOGLE_SHEETS_PRIVATE_KEY ||
    !GOOGLE_SHEET_ID
  ) {
    throw new Error("Google Sheets lead storage is not configured.");
  }

  const auth = new GoogleAuth({
    credentials: {
      client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: "Leads!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        data.name,
        data.email,
        data.goal,
        data.source,
      ]],
    },
  });
}
