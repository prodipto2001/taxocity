"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedPlan, useUserContext } from "@/context/modal";
import { formatNumber } from "@/lib/utils";
import { purchase } from "@/lib/utils/razorpay";

function OrderSummary() {
  const { selectedPlan } = useSelectedPlan();
  const { user } = useUserContext();

  const router = useRouter();

  const gstAmount = selectedPlan.price ? selectedPlan.price * 0.18 : null;
  const gstAddedPrice =
    selectedPlan.price && gstAmount ? selectedPlan.price + gstAmount : null;

  const isUserDataAvailable = user.name && user.email && user.phone;

  function handlePayment() {
    if (!isUserDataAvailable) {
      alert("Session expired. Please complete the registration form again.");
      router.push("/");
      return;
    }

    purchase({
      name: user.name,
      phone: user.phone,
      email: user.email,
      plan: selectedPlan.title,
      description: selectedPlan.description,
      amount: gstAddedPrice,
      // onPaymentStart: () => setIsProcessingPayment(true),
    });
  }

  return (
    <Card className="rounded-lg">
      <CardHeader className="gap-0">
        <CardTitle className="flex flex-col sm:flex-row items-center justify-between text-[#1E1E1E]">
          <span className="font-semibold text-2xl">Order Details</span>
          <span className="text-lg">TAX546544654</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="text-sm sm:text-base mb-6 py-3 border-y border-[#6B7280]/40 text-[#6B7280]">
          <li className="flex items-center justify-between">
            <span>Package</span>
            <span className="font-semibold">Pvt Ltd company incorporation</span>
          </li>

          <li className="flex items-center justify-between">
            <span>Package Price</span>
            <span className="font-semibold">₹{selectedPlan.price}</span>
          </li>

          <li className="flex items-center justify-between">
            <span>18% GST</span>
            <span className="font-semibold">₹325</span>
          </li>

          <li className="flex items-center justify-between">
            <span>Status</span>
            <span className="font-semibold">Pending for Payment</span>
          </li>

          <li className="flex items-center justify-between pt-3 font-semibold text-[#1E1E1E] text-2xl">
            <span>Total</span>
            <span>₹{formatNumber(gstAddedPrice)}</span>
          </li>
        </ul>

        <Button
          size="lg"
          className="h-12 w-full font-bold text-base bg-[#00AD5F] hover:bg-[#28865c]"
          onClick={handlePayment}
        >
          Pay Now
        </Button>

        <div className="space-y-2 mt-3">
          <p className="text-center font-medium">
            We accepts all major debit and credit cards
          </p>
          <SupportedPaymentMethods />
        </div>
      </CardContent>
    </Card>
  );
}

function SupportedPaymentMethods() {
  return (
    <div className="flex items-center justify-between">
      <Image
        src="/logos/rupay.png"
        alt="Rupay logo"
        width={64}
        height={64}
        className="w-12 sm:size-fit"
      />
      <Image
        src="/logos/paytm.png"
        alt="Paytm logo"
        width={64}
        height={43}
        className="w-12 sm:size-fit"
      />
      <Image
        src="/logos/visa.png"
        alt="Visa logo"
        width={64}
        height={36}
        className="w-12 sm:size-fit"
      />
      <Image
        src="/logos/mastercard.png"
        alt="MasterCard logo"
        width={38}
        height={30}
        className="w-7 sm:w-[38px]"
      />
      <Image
        src="/logos/maestro.png"
        alt="Maestro logo"
        width={64}
        height={43}
        className="w-12 sm:size-fit"
      />
      <Image
        src="/logos/upi.png"
        alt="UPI logo"
        width={64}
        height={64}
        className="w-12 sm:size-fit"
      />
    </div>
  );
}

export { OrderSummary };
