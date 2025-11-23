"use client";

import { CircleCheckBig, Info } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import * as React from "react";
import { GovtFeesDetails } from "@/components/sections/govt-fees-details";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useModalOpen, useSelectedPlan, useUserContext } from "@/context/modal";
import { CARD_CONTENTS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

type Plan = {
  title: string | null;
  description: string | null;
  price: number | null;
};

function PricingCards() {
  const pathname = usePathname();
  const router = useRouter();
  const modalState = useModalOpen();
  const { setIsOpen } = modalState;
  const { setSelectedPlan } = useSelectedPlan();
  const { user } = useUserContext();

  // const [isProcessingPayment, setIsProcessingPayment] = React.useState(false);

  const isUserDataAvailable = user.name && user.email && user.phone;

  function handleGetStarted(plan: Plan) {
    setSelectedPlan(plan);
    modalState.setModalSource("pricing");
    setIsOpen(true);
  }

  function handleProceed(plan: Plan) {
    setSelectedPlan(plan);
    router.push("/order-review");
  }

  return (
    <React.Fragment>
      {/* <PaymentProcessingOverlay isVisible={isProcessingPayment} /> */}

      <div className="max-w-[1256px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-20 mt-8 md:mt-20">
        <Script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />

        {CARD_CONTENTS.map((item, index) => (
          <Card
            key={`card-${item.title}`}
            className="max-w-[400px] w-full h-fit sm:h-[560px] gap-4 px-6 flex flex-col shadow-md"
          >
            <CardHeader className="px-0 relative">
              <CardTitle className="flex items-center justify-between text-[28px] text-[#1E293B] font-bold">
                {item.title}
              </CardTitle>
              <CardDescription className="text-[#3F3F3F] text-base font-semibold">
                {item.description}
              </CardDescription>
            </CardHeader>

            <Separator className="bg-[#D9D9D9]" />

            <CardContent className="px-0 flex-1 flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <h1 className="text-5xl xl:text-[56px] font-bold leading-[120%] text-[#1D364D] tabular-nums">
                    ₹{formatNumber(item.price)}
                  </h1>

                  <div className="text-[#1E1E1E] text-sm xl:text-base">
                    <div className="flex items-center gap-1 text-nowrap">
                      + GST +{" "}
                      <span className="text-base underline underline-offset-2">
                        Govt. Fees
                      </span>
                      <GovtFeesDetails>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="-ml-1 sm:ml-0 size-6 cursor-pointer font-normal hover:bg-transparent border border-transparent hover:border-input font-sans"
                        >
                          <Info className="size-3" />
                        </Button>
                      </GovtFeesDetails>
                    </div>

                    <p> (to be paid later)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {item.title !== "Name Approval" && (
                    <span className="font-medium">
                      Everything in {CARD_CONTENTS[index - 1].title} +
                    </span>
                  )}
                  <ul className="mt-2 space-y-2">
                    {item.inclusions.map((inc, index) => (
                      <li
                        key={`${inc.title}-${index}`}
                        className="flex items-center gap-2 leading-tight"
                      >
                        <CircleCheckBig className="text-[#58B09C] size-5 shrink-0" />{" "}
                        {inc.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 sm:mt-0">
                {pathname.includes("/pricing") ? (
                  <Button
                    size="lg"
                    variant="brand"
                    className="w-full"
                    disabled={!isUserDataAvailable}
                    onClick={() => handleProceed(item)}
                  >
                    Proceed
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="brand"
                    className="w-full"
                    onClick={() => handleGetStarted(item)}
                  >
                    Get {item.title}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
}

export { PricingCards };
