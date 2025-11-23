import { jsPDF } from "jspdf";
import { STATES } from "@/lib/constants";

interface PaymentReceiptData {
  paymentId: string;
  orderId: string;
  amount: string;
  plan: string;
  paymentDate: string;
  user: {
    name: string;
    email: string;
    phone: string;
    state: string;
  };
}

// Helper function to get state label from state value
function getStateLabel(stateValue: string): string {
  const state = STATES.find((s) => s.value === stateValue);
  return state ? state.label : stateValue;
}

export async function generatePaymentReceiptPDF(
  paymentData: PaymentReceiptData
): Promise<void> {
  const doc = new jsPDF();

  // font sizes and colors
  const primaryColor = [30, 41, 59]; // #1E293B
  const secondaryColor = [63, 63, 63]; // #3F3F3F
  const borderColor = [200, 200, 200];

  // page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const centerX = pageWidth / 2;
  const contentWidth = 150;
  const leftMargin = (pageWidth - contentWidth) / 2;
  const rightMargin = pageWidth - leftMargin;

  let currentY = 30;

  // logo
  try {
    const logoImg = new Image();
    logoImg.src = "/logos/taxocity.png";

    await new Promise((resolve, reject) => {
      logoImg.onload = resolve;
      logoImg.onerror = reject;
    });

    const logoWidth = 60;
    const logoHeight = (logoImg.height * logoWidth) / logoImg.width;
    doc.addImage(
      logoImg,
      "PNG",
      centerX - logoWidth / 2,
      currentY,
      logoWidth,
      logoHeight
    );
    currentY += logoHeight + 15;
  } catch {
    // if logo fails to load, showing company name
    doc.setFontSize(18);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Taxocity", centerX, currentY, { align: "center" });
    currentY += 15;
  }

  // title - 32px semibold
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Payment Receipt", centerX, currentY, { align: "center" });
  currentY += 15;

  // success message - 16px normal
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text(
    "Thank you for your payment. Your order is being processed.",
    centerX,
    currentY,
    { align: "center" }
  );
  currentY += 15;

  // top border line
  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
  doc.setLineWidth(0.5);
  doc.line(leftMargin, currentY, rightMargin, currentY);
  currentY += 15;

  // payment details header - 16px medium (centered)
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Payment Details", centerX, currentY, { align: "center" });
  currentY += 15;

  // details section - 14px normal
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  const lineHeight = 10;

  // plan
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Plan:", leftMargin, currentY);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(paymentData.plan, rightMargin, currentY, { align: "right" });
  currentY += lineHeight;

  // amount
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Amount Paid:", leftMargin, currentY);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const amountText = `Rs. ${paymentData.amount}`;
  doc.text(amountText, rightMargin, currentY, { align: "right" });
  currentY += lineHeight;

  // payment id
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Payment ID:", leftMargin, currentY);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const paymentIdText = doc.splitTextToSize(paymentData.paymentId, 90);
  doc.text(paymentIdText, rightMargin, currentY, { align: "right" });
  currentY += lineHeight;

  // order id
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Order ID:", leftMargin, currentY);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const orderIdText = doc.splitTextToSize(paymentData.orderId, 90);
  doc.text(orderIdText, rightMargin, currentY, { align: "right" });
  currentY += lineHeight;

  // date & time
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Date & Time:", leftMargin, currentY);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(paymentData.paymentDate, rightMargin, currentY, {
    align: "right",
  });
  currentY += 15;

  // bottom border line
  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
  doc.setLineWidth(0.5);
  doc.line(leftMargin, currentY, rightMargin, currentY);
  currentY += 15;

  // user details header - 16px medium (centered)
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("User Details", centerX, currentY, { align: "center" });
  currentY += 15;

  // user details section - 14px normal
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");

  // name
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Name:", leftMargin, currentY);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(paymentData.user.name, rightMargin, currentY, { align: "right" });
  currentY += lineHeight;

  // email
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Email:", leftMargin, currentY);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const emailText = doc.splitTextToSize(paymentData.user.email, 90);
  doc.text(emailText, rightMargin, currentY, { align: "right" });
  currentY += lineHeight;

  // phone
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Phone:", leftMargin, currentY);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(paymentData.user.phone, rightMargin, currentY, { align: "right" });
  currentY += lineHeight;

  // state
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("State:", leftMargin, currentY);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const stateLabel = getStateLabel(paymentData.user.state);
  doc.text(stateLabel, rightMargin, currentY, { align: "right" });
  currentY += 15;

  // bottom border line after user details
  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
  doc.setLineWidth(0.5);
  doc.line(leftMargin, currentY, rightMargin, currentY);

  // saving pdf
  doc.save(`payment-receipt-${paymentData.orderId}.pdf`);
}
