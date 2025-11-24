import { sheets } from "@googleapis/sheets";
import { GoogleAuth } from "google-auth-library";
import { env } from "@/env";
import { GOOGLE_SHEET_COLUMNS, GOOGLE_SHEET_NAME } from "@/lib/constants";
import type { GoogleSheetsLeadData } from "./google-sheets-client";

function getSheetsClient() {
  const auth = new GoogleAuth({
    credentials: {
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return sheets({
    version: "v4",
    auth,
  });
}

async function ensureHeaders(
  sheetsClient: ReturnType<typeof getSheetsClient>,
): Promise<void> {
  const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;

  // checking if headers exist
  const response = await sheetsClient.spreadsheets.values.get({
    spreadsheetId,
    range: `${GOOGLE_SHEET_NAME}!A1:K1`,
  });

  if (!response.data.values || response.data.values.length === 0) {
    // adding headers
    await sheetsClient.spreadsheets.values.update({
      spreadsheetId,
      range: `${GOOGLE_SHEET_NAME}!A1:K1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            "Phone",
            "Name",
            "Email",
            "State",
            "Payment Status",
            "Payment Amount",
            "Payment ID",
            "Order ID",
            "Payment Date",
            "Last Updated",
            "IP Address",
          ],
        ],
      },
    });
  }
}

async function findRowByPhone(
  sheetsClient: ReturnType<typeof getSheetsClient>,
  phone: string,
): Promise<number | null> {
  const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;

  // getting all phone numbers from column A (starting from row 2)
  const response = await sheetsClient.spreadsheets.values.get({
    spreadsheetId,
    range: `${GOOGLE_SHEET_NAME}!A:A`,
  });

  const rows = response.data.values;
  if (!rows || rows.length <= 1) {
    return null;
  }

  // finding the row with matching phone number (exact match including country code)
  const rowIndex = rows.findIndex(
    (row: any, index: number) =>
      index > 0 && // skipping header row
      row[0] &&
      row[0].toString().trim() === phone.trim(),
  );

  return rowIndex > 0 ? rowIndex + 1 : null; // converting to 1-based index
}

// converting lead data to row values
function dataToRow(
  data: GoogleSheetsLeadData,
  existingRow?: string[],
): string[] {
  const now = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const row =
    existingRow || new Array(Object.keys(GOOGLE_SHEET_COLUMNS).length).fill("");

  // updating only provided fields
  // prefixing phone with single quote to prevent formula parsing
  if (data.phone !== undefined)
    row[GOOGLE_SHEET_COLUMNS.PHONE] = `'${data.phone}`;
  if (data.name !== undefined) row[GOOGLE_SHEET_COLUMNS.NAME] = data.name;
  if (data.email !== undefined) row[GOOGLE_SHEET_COLUMNS.EMAIL] = data.email;
  if (data.state !== undefined) row[GOOGLE_SHEET_COLUMNS.STATE] = data.state;
  if (data.payment_status !== undefined)
    row[GOOGLE_SHEET_COLUMNS.PAYMENT_STATUS] = data.payment_status;
  if (data.payment_amount !== undefined)
    row[GOOGLE_SHEET_COLUMNS.PAYMENT_AMOUNT] = data.payment_amount.toString();
  if (data.payment_id !== undefined)
    row[GOOGLE_SHEET_COLUMNS.PAYMENT_ID] = data.payment_id;
  if (data.order_id !== undefined)
    row[GOOGLE_SHEET_COLUMNS.ORDER_ID] = data.order_id;
  if (data.payment_date !== undefined)
    row[GOOGLE_SHEET_COLUMNS.PAYMENT_DATE] = data.payment_date;
  if (data.ip_address !== undefined)
    row[GOOGLE_SHEET_COLUMNS.IP_ADDRESS] = data.ip_address;

  // use provided last_updated or generate new timestamp
  row[GOOGLE_SHEET_COLUMNS.LAST_UPDATED] = data.last_updated ?? now;

  return row;
}

/**
 * Update or insert lead data in Google Sheets
 * - If phone exists: update the existing row
 * - If phone doesn't exist: create new row
 */
async function upsertLeadData(data: GoogleSheetsLeadData): Promise<{
  success: boolean;
  message: string;
  action: "updated" | "created";
}> {
  if (!data.phone) {
    throw new Error("Phone number is required");
  }

  const sheetsClient = getSheetsClient();
  const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;

  // ensuring headers exist
  await ensureHeaders(sheetsClient);

  // finding existing row by phone number
  const existingRowIndex = await findRowByPhone(sheetsClient, data.phone);

  if (existingRowIndex !== null) {
    // updating existing row
    // getting the existing row data
    const existingResponse = await sheetsClient.spreadsheets.values.get({
      spreadsheetId,
      range: `${GOOGLE_SHEET_NAME}!A${existingRowIndex}:K${existingRowIndex}`,
    });

    const existingRowData = existingResponse.data.values?.[0] || [];
    const updatedRow = dataToRow(data, existingRowData);

    await sheetsClient.spreadsheets.values.update({
      spreadsheetId,
      range: `${GOOGLE_SHEET_NAME}!A${existingRowIndex}:K${existingRowIndex}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [updatedRow],
      },
    });

    return {
      success: true,
      message: `Lead updated successfully at row ${existingRowIndex}`,
      action: "updated",
    };
  }

  // creating new row
  const newRow = dataToRow(data);

  await sheetsClient.spreadsheets.values.append({
    spreadsheetId,
    range: `${GOOGLE_SHEET_NAME}!A:K`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [newRow],
    },
  });

  return {
    success: true,
    message: "Lead created successfully",
    action: "created",
  };
}

/**
 * Mock function for testing without hitting Google Sheets API
 */
async function mockUpsertLeadData(data: GoogleSheetsLeadData): Promise<{
  success: boolean;
  message: string;
  action: "updated" | "created";
}> {
  console.log("mock google sheets api call");
  console.log("data: ", data);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Mock: Lead upserted successfully",
    action: Math.random() > 0.5 ? "updated" : "created",
  };
}

/**
 * Main function to update Google Sheets (supports mock mode)
 */
async function updateGoogleSheet(
  data: GoogleSheetsLeadData,
  useMock = false,
): Promise<{
  success: boolean;
  message: string;
  action: "updated" | "created";
}> {
  if (useMock) {
    return mockUpsertLeadData(data);
  }
  return upsertLeadData(data);
}

export {
  updateGoogleSheet,
  type GoogleSheetsLeadData,
  getSheetsClient,
  upsertLeadData,
};
