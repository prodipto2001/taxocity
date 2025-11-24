import { Resend } from "resend";
import { env } from "@/env";
import {
  getHTMLContent,
  getTextFallback,
} from "@/lib/actions/get-html-content";

export type EmailData = {
  to: string;
  name: string;
  plan: string;
  amount: number;
  paymentId: string;
  orderId: string;
  brandName: string;
  paymentDate: string;
  // paymentMode: string
  directorFormLink: string;
  documentUploadLink: string;
};

async function sendEmail(data: EmailData) {
  try {
    const resend = new Resend(env.RESEND_API_KEY);

    const fs = await import("node:fs");
    const path = await import("node:path");

    const htmlContent = getHTMLContent(data);
    const textFallback = getTextFallback(data);

    // Read the logo file
    const logoPath = path.join(
      process.cwd(),
      "public",
      "logos",
      "taxocity.png"
    );
    const logoBuffer = fs.readFileSync(logoPath);

    const result = await resend.emails.send({
      from: "onboarding@taxocity.com",
      to: data.to,
      subject: "Payment Received Successfully – Next Steps",
      html: htmlContent,
      text: textFallback,
      attachments: [
        {
          filename: "logo.png",
          content: logoBuffer,
          contentId: "logo",
        },
      ],
    });

    console.log("Email sent successfully:", result);

    return { success: true, result };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

async function sendPaymentConfirmationEmail({
  name,
  email,
  plan,
  amount,
  paymentId,
  orderId,
  paymentDate,
}: {
  email: string;
  name: string;
  plan: string;
  amount: number;
  paymentId: string;
  orderId: string;
  paymentDate: string;
}) {
  await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: email,
      name,
      plan,
      amount,
      paymentId,
      orderId,
      paymentDate,
    }),
  });
}

export { sendPaymentConfirmationEmail, sendEmail };
