"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedPlan, useUserContext } from "@/context/modal";
import { getGSTAmount } from "@/lib/utils";
import { deleteCookie } from "@/lib/utils/cookies";
import { generatePaymentReceiptPDF } from "@/lib/utils/pdf";
import { ErrorContent } from "./error-content";
import { SuccessContent } from "./success-content";
import { ValidatingContent } from "./validation-content";

type PaymentData = {
  paymentId: string;
  orderId: string;
  amount: string;
  plan: string;
  paymentDate: string;
};

function PaymentSuccessContent() {
  const [status, setStatus] = React.useState<
    "validating" | "error" | "success"
  >("validating");
  const [error, setError] = React.useState<string | null>(null);
  const [paymentData, setPaymentData] = React.useState<PaymentData | null>(
    null,
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
            JSON.stringify(data.paymentData),
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

function PaymentSuccess() {
  return (
    <React.Suspense fallback={<PaymentSuccessSkeleton />}>
      <PaymentSuccessContent />
    </React.Suspense>
  );
}

function PaymentSuccessSkeleton() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="gap-0">
        <CardTitle className="flex flex-col sm:flex-row items-center justify-between text-[#1E1E1E]">
          <span className="font-semibold text-2xl">Payment Confirmation</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <ValidatingContent />
      </CardContent>
    </Card>
  );
}

export { PaymentSuccess };
