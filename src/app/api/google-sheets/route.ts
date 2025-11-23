import { NextResponse } from "next/server";
import { updateGoogleSheet } from "@/lib/utils/google-sheets";
import type { GoogleSheetsLeadData } from "@/lib/utils/google-sheets-client";

export async function POST(request: Request) {
  try {
    const leadData: GoogleSheetsLeadData = await request.json();

    // validating required fields
    if (!leadData.phone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 },
      );
    }

    // updating google sheets
    const result = await updateGoogleSheet(leadData);

    return NextResponse.json({
      success: true,
      message: result.message,
      action: result.action,
    });
  } catch (error) {
    console.error("Google Sheets API Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
