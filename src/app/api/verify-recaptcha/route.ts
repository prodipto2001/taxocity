import { NextResponse } from "next/server";
import { env } from "@/env";

interface RecaptchaVerificationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  "error-codes"?: string[];
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA token is required" },
        { status: 400 }
      );
    }

    // Verify the token with Google's reCAPTCHA API
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`;

    const response = await fetch(verificationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data: RecaptchaVerificationResponse = await response.json();

    // reCAPTCHA v3 returns a score (0.0 - 1.0)
    // 0.0 is very likely a bot, 1.0 is very likely a human
    // Recommended threshold: 0.5
    const threshold = 0.5;

    if (data.success && data.score && data.score >= threshold) {
      return NextResponse.json({
        success: true,
        score: data.score,
        message: "reCAPTCHA verification successful",
      });
    }

    return NextResponse.json(
      {
        success: false,
        score: data.score || 0,
        message: "reCAPTCHA verification failed. Please try again.",
        errors: data["error-codes"],
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during reCAPTCHA verification",
      },
      { status: 500 }
    );
  }
}
