"use client";

import { CircleCheck, Loader, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedPlan, useUserContext } from "@/context/modal";
import { getGSTAmount } from "@/lib/utils";
import { deleteCookie } from "@/lib/utils/cookies";
import { generatePaymentReceiptPDF } from "@/lib/utils/pdf";

type PaymentData = {
  paymentId: string;
  orderId: string;
  amount: string;
  plan: string;
  paymentDate: string;
};

function PaymentSuccess() {
  const [status, setStatus] = React.useState<
    "validating" | "error" | "success"
  >("validating");
  const [error, setError] = React.useState<string | null>(null);
  const [paymentData, setPaymentData] = React.useState<PaymentData | null>(
    null
  );

  const { user } = useUserContext();
  const { selectedPlan } = useSelectedPlan();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const gstAmount = getGSTAmount(selectedPlan.price ? selectedPlan.price : 0);

  const handleDownloadReceipt = React.useCallback(async () => {
    if (!paymentData) return; // TODO: show error in toast
    await generatePaymentReceiptPDF({
      ...paymentData,
      orderId: user.orderId || "",
      user: {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        state: user.state || "",
      },
    });
  }, [paymentData, user]);

  React.useEffect(() => {
    const validateToken = async () => {
      // checking if we have cached payment data in sessionStorage
      const cachedData = sessionStorage.getItem("payment-success-data");
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setPaymentData(parsedData);
          setStatus("success");
          return;
        } catch {
          // if parsing fails, going with token validation
          sessionStorage.removeItem("payment-success-data");
        }
      }

      if (!token) {
        setError("No Payment token found!");
        setStatus("error");
        setTimeout(() => router.push("/"), 2000);
        return;
      }

      try {
        const response = await fetch(`/api/verify-payment?token=${token}`);
        const data = await response.json();
        console.log("[verify-payment-GET] = ", { data });

        if (data.isValid && data.paymentData) {
          setPaymentData(data.paymentData);
          setStatus("success");

          // storing payment data in sessionStorage for this session
          sessionStorage.setItem(
            "payment-success-data",
            JSON.stringify(data.paymentData)
          );

          // removing token from URL to prevent revalidation
          router.replace("/payment-success", { scroll: false });
        } else {
          setError(data.message ?? "Invalid Payment Token");
          setStatus("error");
          setTimeout(() => router.push("/"), 2000);
        }
      } catch (_error) {
        setError("Failed to validate payment token");
        setStatus("error");
        setTimeout(() => router.push("/"), 2000);
      }
    };
    validateToken();
  }, [token, router]);

  // cleanup: clearing all stored data when user navigates away from payment success page
  React.useEffect(() => {
    const clearAllStoredData = () => {
      // clearing session storage
      sessionStorage.removeItem("payment-success-data");

      // clearing localStorage (order is complete, no need to keep this data)
      localStorage.removeItem("user_data");
      localStorage.removeItem("selected_plan");

      // clearing cookies
      deleteCookie("form_completed");
    };

    // clearing on page unload (refresh, close tab, navigate away)
    const handleBeforeUnload = () => {
      clearAllStoredData();
    };

    // clearing when user uses browser back/forward buttons to leave this page
    const handlePopState = () => {
      clearAllStoredData();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      // listeners
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);

      // clearing all stored data when component unmounts
      clearAllStoredData();
    };
  }, []);

  const content = React.useMemo(() => {
    switch (status) {
      case "validating":
        return <ValidatingContent />;
      case "error":
        return <ErrorContent error={error} />;
      case "success":
        return (
          <SuccessContent
            gstAmount={gstAmount}
            handleDownloadReceipt={handleDownloadReceipt}
          />
        );
    }
  }, [status, gstAmount, handleDownloadReceipt, error]);

  return (
    <Card className="rounded-lg">
      <CardHeader className="gap-0">
        <CardTitle className="flex flex-col sm:flex-row items-center justify-between text-[#1E1E1E]">
          <span className="font-semibold text-2xl">Payment Confirmation</span>
          <span className="text-lg">{user.orderId}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">{content}</CardContent>
    </Card>
  );
}

export { PaymentSuccess };

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

function ErrorContent({ error }: { error: string | null }) {
  return (
    <div className="min-h-[460px] flex flex-col items-center justify-center gap-6 md:gap-12">
      <div className="bg-destructive/20 p-4 rounded-full">
        <X className="size-10 md:size-12 text-destructive" />
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold">Access Denied</h1>
        <p className="text-center font-semibold text-[#3F3F3F] mb-4">
          {error || "Invalid or expired payment session"}
        </p>
      </div>

      <p>Redirecting you to home page...</p>
    </div>
  );
}

function ValidatingContent() {
  return (
    <div className="min-h-[460px] flex flex-col items-center justify-center gap-6 md:gap-12">
      <div className="bg-[#B3DBFF]/40 p-4 rounded-full">
        <Loader className="animate-spin size-10 md:size-12" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">Validating Payment</h1>
    </div>
  );
}
