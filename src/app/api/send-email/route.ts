import { sendEmail } from "@/lib/utils/resend";
import { type NextRequest, NextResponse } from "next/server";

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
        { status: 400 }
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
      formLink: "", // TODO: add typeform link
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Send email API failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
