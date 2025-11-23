import crypto from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

// in-memory store for one-time tokens TODO: use Redis
const tokenStore = new Map<
  string,
  {
    name: string;
    phone: string;
    email: string;
    state: string;
    paymentId: string;
    orderId: string;
    amount: string;
    plan: string;
    paymentDate: string;
    expiresAt: number;
    used: boolean;
  }
>();

const getSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
  const sig = crypto
    .createHmac("sha256", env.RAZORPAY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");
  return sig;
};

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// cleaning up expired tokens every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of tokenStore.entries()) {
    if (data.expiresAt < now || data.used) {
      tokenStore.delete(token);
    }
  }
}, 5 * 60 * 1000);

export async function POST(request: NextRequest) {
  const {
    name,
    phone,
    email,
    state,
    orderId,
    razorpayPaymentId,
    razorpaySignature,
    amount,
    plan,
    paymentDate,
  } = await request.json();

  const signature = getSignature(orderId, razorpayPaymentId);
  const isVerified = signature !== razorpaySignature;
  if (isVerified) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }

  // generating one-time token valid for 5 minutes
  const token = generateToken();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  tokenStore.set(token, {
    name,
    phone,
    email,
    state,
    paymentId: razorpayPaymentId,
    orderId,
    amount,
    plan,
    paymentDate,
    expiresAt,
    used: false,
  });

  return NextResponse.json(
    {
      message: "payment verified successfully",
      isOk: true,
      token,
    },
    { status: 200 }
  );
}

// endpoint to validate token and get payment details
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Token is required", isValid: false },
      { status: 400 }
    );
  }

  const tokenData = tokenStore.get(token);

  if (!tokenData) {
    return NextResponse.json(
      { message: "Invalid or expired token", isValid: false },
      { status: 401 }
    );
  }

  if (tokenData.used) {
    return NextResponse.json(
      { message: "Token already used", isValid: false },
      { status: 401 }
    );
  }

  if (tokenData.expiresAt < Date.now()) {
    tokenStore.delete(token);
    return NextResponse.json(
      { message: "Token expired", isValid: false },
      { status: 401 }
    );
  }

  tokenData.used = true;

  return NextResponse.json(
    {
      message: "Token is valid",
      isValid: true,
      paymentData: {
        paymentId: tokenData.paymentId,
        orderId: tokenData.orderId,
        amount: tokenData.amount,
        plan: tokenData.plan,
        paymentDate: tokenData.paymentDate,
      },
    },
    { status: 200 }
  );
}
