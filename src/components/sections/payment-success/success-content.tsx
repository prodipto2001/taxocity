"use client";

import { CircleCheck } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useSelectedPlan, useUserContext } from "@/context/modal";

function SuccessContent({
  gstAmount,
  handleDownloadReceipt,
}: {
  gstAmount: string;
  handleDownloadReceipt: () => Promise<void>;
}) {
  const { user } = useUserContext();
  const { selectedPlan } = useSelectedPlan();

  return (
    <React.Fragment>
      <div className="space-y-6">
        <CircleCheck className="size-[84px] fill-[#58B09C] text-white mx-auto" />
        <p className="text-center text-2xl font-bold leading-tight text-[#1E1E1E]">
          Thank you for your payment {user.name}. Your order has been
          successfully received.
        </p>
      </div>

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
          <span className="font-semibold">₹{gstAmount}</span>
        </li>

        <li className="flex items-center justify-between">
          <span>Transaction ID</span>
          <span className="font-semibold">{selectedPlan.transactionID}</span>
        </li>

        <li className="flex items-center justify-between">
          <span>Transaction Date</span>
          <span className="font-semibold">{selectedPlan.transactionDate}</span>
        </li>

        <li className="flex items-center justify-between">
          <span>Status</span>
          <span className="font-semibold">Payment Successful</span>
        </li>
      </ul>

      <Button
        variant="brand"
        size="lg"
        className="w-full"
        onClick={handleDownloadReceipt}
      >
        Download Receipt
      </Button>

      <p className="font-medium text-left md:text-center">
        Our team will reach out to you to get a form filled, once it's filled,
        we wiill begin processing your documents and reach out if anything else
        is needed.
      </p>
    </React.Fragment>
  );
}

export { SuccessContent };
