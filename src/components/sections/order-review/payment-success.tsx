import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

function PaymentSuccess() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="gap-0">
        <CardTitle className="flex flex-col sm:flex-row items-center justify-between text-[#1E1E1E]">
          <span className="font-semibold text-2xl">Payment Confirmation</span>
          <span className="text-lg">TAX546544654</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-6">
          <CircleCheck className="size-[84px] fill-[#58B09C] text-white mx-auto" />
          <p className="text-center text-2xl font-bold leading-tight text-[#1E1E1E]">
            Thank you for your payment [Name]. Your order has been successfully
            received.
          </p>
        </div>

        <ul className="text-sm sm:text-base mb-6 py-3 border-y border-[#6B7280]/40 text-[#6B7280]">
          <li className="flex items-center justify-between">
            <span>Package</span>
            <span className="font-semibold">Pvt Ltd company incorporation</span>
          </li>

          <li className="flex items-center justify-between">
            <span>Package Price</span>
            <span className="font-semibold">₹3499</span>
          </li>

          <li className="flex items-center justify-between">
            <span>18% GST</span>
            <span className="font-semibold">₹325</span>
          </li>

          <li className="flex items-center justify-between">
            <span>Transaction ID</span>
            <span className="font-semibold">[ID]</span>
          </li>

          <li className="flex items-center justify-between">
            <span>Transaction Date</span>
            <span className="font-semibold">[Date]</span>
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
          // onClick={handleDownloadReceipt}
        >
          Save Receipt
        </Button>

        <p className="font-medium text-left md:text-center">
          Our team will reach out to you to get a form filled, once it’s filled,
          we wiill begin processing your documents and reach out if anything
          else is needed.
        </p>
      </CardContent>
    </Card>
  );
}

export { PaymentSuccess };
