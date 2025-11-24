"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedPlan, useUserContext } from "@/context/modal";
import { formatNumber, getGSTAmount, getGSTIncludedPrice } from "@/lib/utils";
import { purchase } from "@/lib/utils/razorpay";

function OrderSummary() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isButtonVisible, setIsButtonVisible] = React.useState(true);

  const { selectedPlan, setSelectedPlan } = useSelectedPlan();
  const { user } = useUserContext();

  const router = useRouter();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  const isUserDataAvailable = user.name && user.email && user.phone;

  const gstAmount = getGSTAmount(selectedPlan.price ? selectedPlan.price : 0);
  const gstIncludedPrice = getGSTIncludedPrice(
    selectedPlan.price ? selectedPlan.price : 0
  );

  function handlePaymentProcessing(
    transactionID: string,
    transactionDate: string
  ) {
    setSelectedPlan((prev) => ({ ...prev, transactionID, transactionDate }));
  }

  function updatePrice(revisedPrice: string) {
    setSelectedPlan((prev) => ({ ...prev, gstIncludedPrice: revisedPrice }));
  }

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
      orderId: user.orderId,
      plan: selectedPlan.title,
      state: user.state,
      description: selectedPlan.description,
      amount: Number(gstIncludedPrice),
      onPaymentStart: () => setIsProcessing(true),
      handlePaymentProcessing,
      updatePrice,
    });
  }

  return (
    <Card className="rounded-lg">
      <CardHeader className="gap-0">
        <CardTitle className="flex flex-col sm:flex-row items-center justify-between text-[#1E1E1E]">
          <span className="font-semibold text-2xl">Order Details</span>
          <span className="text-lg">{user.orderId || "Loading..."}</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="text-sm sm:text-base mb-6 py-3 border-y border-[#6B7280]/40 text-[#6B7280]">
          <li className="flex items-center justify-between">
            <span>Package</span>
            <span className="font-semibold">{selectedPlan.title} Plan</span>
          </li>

          <li className="flex items-center justify-between">
            <span>Package Price</span>
            <span className="font-semibold">₹{selectedPlan.price}</span>
          </li>

          <li className="flex items-center justify-between">
            <span>18% GST</span>
            <span className="font-semibold">₹{gstAmount}</span>
          </li>

          <li className="flex items-center justify-between">
            <span>Status</span>
            <span className="font-semibold">Pending for Payment</span>
          </li>

          <li className="flex items-center justify-between pt-3 font-semibold text-[#1E1E1E] text-2xl">
            <span>Total</span>
            <span>₹{formatNumber(gstIncludedPrice)}</span>
          </li>
        </ul>

        <Button
          ref={buttonRef}
          size="lg"
          className="h-12 w-full font-bold text-base bg-[#00AD5F] hover:bg-[#28865c]"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>

        {/* Sticky button when original is out of view */}
        {!isButtonVisible && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
            <Button
              size="lg"
              className="h-12 w-full font-bold text-base bg-[#00AD5F] hover:bg-[#28865c]"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        )}

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
