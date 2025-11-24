import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Extract IP address from request headers
    // Check multiple headers as different hosting providers use different ones
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip"); // Cloudflare

    // x-forwarded-for can contain multiple IPs, take the first one (client IP)
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : realIp || cfConnectingIp || "Unknown";

    return NextResponse.json({
      success: true,
      ip,
    });
  } catch (error) {
    console.error("Error getting IP address:", error);
    return NextResponse.json(
      {
        success: false,
        ip: "Unknown",
        error: "Failed to retrieve IP address",
      },
      { status: 500 },
    );
  }
}
