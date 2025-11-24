import { env } from "@/env";
import { deleteCookie } from "./cookies";
import { sendPaymentConfirmationEmail } from "./resend";
import { updateTeleCRMLead } from "./telecrm";
import { updateGoogleSheetViaAPI } from "./google-sheets-client";

async function createOrder(amount: number) {
  const response = await fetch("/api/create-order", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });

  return await response.json();
}

async function verifyPayment(
  response: any,
  name: string,
  phone: string,
  email: string,
  state: string,
  amount: number,
  plan: string,
  paymentDate: string
) {
  const _response = await fetch("/api/verify-payment", {
    method: "POST",
    body: JSON.stringify({
      orderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      name,
      phone,
      email,
      state,
      amount: amount.toString(),
      plan,
      paymentDate,
    }),
  });
  return await _response.json();
}

async function purchase({
  name,
  phone,
  email,
  orderId,
  state,
  plan,
  description,
  amount,
  onPaymentStart,
  handlePaymentProcessing,
  updatePrice,
}: {
  name: string | null;
  phone: string | null;
  email: string | null;
  state: string | null;
  orderId: string | null | undefined;
  plan: string | null;
  amount: number | null;
  description?: string | null;
  onPaymentStart?: () => void;
  handlePaymentProcessing?: (id: string, date: string) => void;
  updatePrice?: (price: string) => void;
}) {
  if (
    !name ||
    !phone ||
    !email ||
    !state ||
    !orderId ||
    !plan ||
    !description ||
    !amount
  ) {
    throw new Error("Values passed to purchase function can't be null");
  }

  const order = await createOrder(amount);

  const paymentData = {
    key: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount,
    currency: "INR",
    order_id: order.id,
    name: "Taxocity",
    plan: `Private Limited Company - ${plan}`,
    description,
    handler: async (response: any) => {
      const paymentDate = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const data = await verifyPayment(
        response,
        name,
        phone,
        email,
        state,
        amount,
        plan,
        paymentDate
      );

      if (data.isOk) {
        onPaymentStart?.();

        handlePaymentProcessing?.(response.razorpay_payment_id, paymentDate);
        updatePrice?.(amount.toFixed(2));

        // updating telecrm
        await updateTeleCRMLead({
          phone,
          email,
          order_id: orderId,
          payment_amount: amount,
          payment_id: response.razorpay_payment_id,
          payment_status: "completed",
        });

        // updating sheets with payment info
        await updateGoogleSheetViaAPI({
          phone,
          email,
          name,
          order_id: orderId,
          payment_amount: amount,
          payment_id: response.razorpay_payment_id,
          payment_status: "completed",
          payment_date: paymentDate,
          last_updated: paymentDate,
        });

        await sendPaymentConfirmationEmail({
          name,
          email,
          plan,
          amount,
          paymentId: response.razorpay_payment_id,
          orderId,
          paymentDate,
        });

        // redirecting to payment success page with token
        window.location.href = `/payment-success?token=${data.token}`;
      } else {
        alert("Payment failed");
      }
    },
  };

  const payment = new (window as any).Razorpay(paymentData);
  payment.open();
}

export { purchase };
