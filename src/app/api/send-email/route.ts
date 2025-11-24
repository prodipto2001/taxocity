import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { sendEmail } from "@/lib/utils/resend";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (
      !data.to ||
      !data.name ||
      !data.plan ||
      !data.amount ||
      !data.paymentId ||
      !data.orderId ||
      !data.paymentDate
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await sendEmail({
      to: data.to,
      name: data.name,
      plan: data.plan,
      amount: data.amount,
      paymentId: data.paymentId,
      orderId: data.orderId,
      brandName: "Taxocity",
      paymentDate: data.paymentDate,
      directorFormLink: env.NEXT_PUBLIC_DIRECTOR_FORM_LINK,
      documentUploadLink: env.NEXT_PUBLIC_DOCUMENT_UPLOAD_LINK,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Send email API failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
