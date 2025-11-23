import { Info } from "lucide-react";
import * as React from "react";
import { PaymentSuccess } from "@/components/sections/order-review/payment-success";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <React.Fragment>
      <Button
        variant="outline"
        size="lg"
        className="h-10 xl:hidden w-full text-[#1E293B]"
      >
        <Info className="size-4" /> Contact Us
      </Button>

      <PaymentSuccess />
    </React.Fragment>
  );
}
