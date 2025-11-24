"use client";

import { CircleCheckBig, Info } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
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
import { cn, formatNumber } from "@/lib/utils";

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

  const isUserDataAvailable = user.name && user.email && user.phone;

  function handleGetStarted(plan: Plan) {
    setSelectedPlan({
      ...plan,
      transactionID: null,
      transactionDate: null,
      gstIncludedPrice: null,
    });
    modalState.setModalSource("pricing");
    setIsOpen(true);
  }

  function handleProceed(plan: Plan) {
    setSelectedPlan({
      ...plan,
      transactionID: null,
      transactionDate: null,
      gstIncludedPrice: null,
    });
    router.push("/order-review");
  }

  return (
    <div className="max-w-[1256px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-14 lg:gap-20 mt-8 md:mt-20">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      {CARD_CONTENTS.map((item, index) => (
        <Card
          key={`card-${item.title}`}
          className={cn(
            "relative max-w-[400px] w-full h-fit sm:h-[560px] gap-4 px-6 flex flex-col shadow-md",
            item.title === "Company Registration" && "border-[#58B09C]"
          )}
        >
          {item.title === "Company Registration" && (
            <span className="absolute -top-4  left-1/2 -translate-x-1/2 flex items-center gap-1 py-2 px-4 rounded-full border-[#58B09C] bg-[#58B09C] text-xs text-white font-medium">
              Recommended
            </span>
          )}

          <CardHeader className="px-0 relative">
            <CardTitle className="flex items-center justify-center text-[28px] text-[#1E293B] font-bold">
              {item.title}
            </CardTitle>
            <CardDescription className="text-[#3F3F3F] text-base  text-center font-semibold">
              {item.description}
            </CardDescription>
          </CardHeader>

          <Separator className="bg-[#D9D9D9]" />

          <CardContent className="px-0 flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <h1 className="text-center text-5xl xl:text-[56px] font-bold leading-[120%] text-[#1D364D] tabular-nums">
                  ₹{formatNumber(item.price)}
                </h1>

                {item.title !== "Name Approval" ? (
                  <div className="flex items-center justify-center gap-1 text-[#1E1E1E] text-sm xl:text-base">
                    <div className="flex items-center">
                      <span className="mx-1">+</span>
                      <GovtFeesDetails>
                        <span className="cursor-pointer underline underline-offset-2">
                          Govt. Fees
                        </span>
                      </GovtFeesDetails>
                    </div>
                    <p> (to be paid later)</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1 text-[#1E1E1E] text-sm xl:text-base">
                    <div className="flex items-center">
                      <span className="mx-1">+</span>
                      <span>Govt. Fees</span>
                    </div>
                    <p> (to be paid later)</p>
                  </div>
                )}
              </div>

              <div>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { PricingCards };
