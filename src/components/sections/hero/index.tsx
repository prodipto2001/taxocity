import Image from "next/image";
import { MultiStepForm } from "@/components/sections/multi-step-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Deliverables } from "./deliverables";
import { GoogleReviews } from "./google-reviews";
import { PricingButton } from "./pricing-button";
import { TrustableFeaturesCarousel } from "./trusted-features";

function Hero() {
  return (
    <section className="py-28 md:py-32 px-4 md:px-16 bg-[linear-gradient(318deg,rgba(255,177,50,0.5)_10%,rgba(251,249,243,1)_60%,rgba(246,238,255,1)_100%)]">
      <div className="max-w-[1256px] mx-auto flex flex-col xl:flex-row items-center justify-center gap-8 md:gap-20">
        <div className="space-y-6">
          <GoogleReviews />

          <div className="flex flex-col md:flex-row items-center gap-2 py-2 px-3 border rounded-xl bg-[#F9FAFB] max-w-[calc(100vw-55px)] md:max-w-2xl overflow-x-hidden">
            <div className="flex min-w-max items-center gap-2">
              <Image
                src="/logos/guard-check.svg"
                alt="shield check icon"
                width={24}
                height={24}
                className="size-5"
              />
              <span className="text-[#1D364D] text-nowrap">
                What sets us apart?
              </span>
            </div>

            <TrustableFeaturesCarousel />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black leading-[120%] text-[#1E293B]">
              Register Your Private <br className="hidden md:flex" /> Limited
              Company in India
            </h1>

            <p className="md:text-lg leading-normal text-[#1A1A1A]/60 font-normal">
              Experience seamless legal drafting, faster MCA approvals, and a
              fully guided online registration process. All in one place.
            </p>
          </div>

          <Deliverables />

          <PricingButton />
        </div>

        <div className="max-w-[500px] border border-[#CECFD3] rounded-2xl p-3 w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(153,153,153,0.16)_100%)] backdrop-blur-md">
          <Card className="relative justify-evenly z-10 w-full h-full shadow-lg border-[#E5E7EB] gap-4">
            <CardHeader className="text-2xl font-bold text-center">
              <span>Need help with Company Registration?</span>
            </CardHeader>
            <CardContent className="px-8 flex-1 flex flex-col">
              <MultiStepForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export { Hero };
