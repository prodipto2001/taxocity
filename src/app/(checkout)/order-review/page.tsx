import { ContactUsButton } from "@/components/sections/order-review/contact-us";
import { OrderSummary } from "@/components/sections/order-review/order-summary";
import { UserDetails } from "@/components/sections/order-review/user-details";
import Image from "next/image";
import * as React from "react";

export default function OrderReviewPage() {
  return (
    <React.Fragment>
      <Features />

      <OrderSummary />

      <ContactUsButton />

      <UserDetails />
    </React.Fragment>
  );
}

function Features() {
  return (
    <div className="md:min-w-[587px] p-2 md:p-6 rounded-lg flex items-center justify-between gap-1 md:gap-4 bg-[#58B09C]/10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-1">
        <Image
          src="/logos/money-security.svg"
          alt="money security logo"
          width={48}
          height={48}
          className="size-4 md:size-12"
        />
        <p className="text-xs font-bold text-center">
          Your money will be secured with 100% refund policy
        </p>
      </div>

      <div className="h-6 w-px bg-[#58B09C]" />

      <div className="flex flex-col md:flex-row items-center justify-center gap-1">
        <Image
          src="/logos/mobile-pay.svg"
          alt="mobile payment logo"
          width={48}
          height={48}
          className="size-4 md:size-12"
        />
        <p className="text-xs font-bold text-center">
          Pay through UPI, Net Banking, Debit/Credit Card
        </p>
      </div>

      <div className="h-6 w-px bg-[#58B09C]" />

      <div className="flex flex-col md:flex-row items-center justify-center gap-1">
        <Image
          src="/logos/shield-circle-check.svg"
          alt="shield circle check logo"
          width={48}
          height={48}
          className="size-4 md:size-12"
        />
        <p className="text-xs font-bold text-center">
          Your details will be protected with our privacy policy
        </p>
      </div>
    </div>
  );
}
