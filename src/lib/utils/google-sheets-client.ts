/**
 * Client-side Google Sheets utilities
 * This file can be safely imported in browser/client components
 */

export type GoogleSheetsLeadData = {
  phone: string;
  email?: string;
  name?: string;
  state?: string;
  payment_status?: "pending" | "completed" | "failed";
  payment_amount?: number;
  payment_id?: string;
  order_id?: string;
  payment_date?: string;
  last_updated?: string;
  ip_address?: string;
};

export async function updateGoogleSheetViaAPI(
  data: GoogleSheetsLeadData,
): Promise<{
  success: boolean;
  message: string;
  action: "updated" | "created";
}> {
  const response = await fetch("/api/google-sheets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? "Failed to update Google Sheets");
  }

  return response.json();
}
