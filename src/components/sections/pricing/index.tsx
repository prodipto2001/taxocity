import { PricingCards } from "./cards";

export function Pricing() {
  return (
    <section id="pricing" className="py-12 md:py-28 px-5 md:px-16">
      <div className="max-w-[1256px] mx-auto space-y-6 mb-20">
        <h2 className="text-[32px] md:text-5xl font-bold text-center text-[#1E293B]">
          Right Plan for Your Business
        </h2>
        <p className="md:text-lg text-center text-[#3F3F3F]">
          Business setup made simple. Just as it should be
        </p>
      </div>

      <PricingCards />
    </section>
  );
}
