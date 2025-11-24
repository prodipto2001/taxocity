import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function WhyTaxocity() {
  return (
    <section className="py-12 md:py-28 px-5 md:px-16">
      <div className="max-w-[1256px] mx-auto space-y-6">
        <div className="space-y-4">
          <h1 className="text-[32px] md:text-5xl leading-[130%] font-bold">
            Why choose Taxocity?
          </h1>
          <p>
            Your trusted partner in business compliance and growth, empowering
            entrepreneurs with seamless legal, tax, and regulatory solutions
            since 1975.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-evenly gap-6">
          <Card className="h-fit lg:h-[680px] bg-[#58B09C]/10 text-[#165B4B] text-lg border-[#165B4B] group">
            <CardHeader>
              <CardTitle>Our Legacy and Experience</CardTitle>
              <div className="bg-linear-to-r from-[#58B09C] to-transparent w-44 h-px" />
            </CardHeader>

            <CardContent className="space-y-6">
              <Image
                src="/images/legacy.svg"
                alt="legacy and trust"
                width={350}
                height={350}
                className="mx-auto hidden sm:block group-hover:scale-105 transition-transform duration-200"
              />

              <p>
                With nearly three decades of experience, TaxoCity has evolved
                from a traditional tax consulting firm to a comprehensive
                business ecosystem. We’ve helped thousands of entrepreneurs
                transform their ideas into legally compliant, thriving
                enterprises while staying ahead of regulatory changes.
              </p>
            </CardContent>
          </Card>

          <Card className="h-fit lg:h-[680px] bg-[#F99F0E1A]/10 text-[#DF8900] text-lg border-[#DF8900] group">
            <CardHeader>
              <CardTitle>Our Mission & Values</CardTitle>
              <div className="bg-linear-to-r from-[#DF8900] to-transparent w-44 h-px" />
            </CardHeader>

            <CardContent className="space-y-6">
              <Image
                src="/images/mission.svg"
                alt="mission and values"
                width={350}
                height={350}
                className="mx-auto hidden sm:block group-hover:scale-105 transition-transform duration-200"
              />

              <p>
                We believe complex compliance shouldn’t be a barrier to
                entrepreneurship. Our mission is to make business formation
                accessible, affordable, and transparent for everyone. Driven by
                integrity, expertise, and customer-centricity, we provide
                strategic guidance that supports your long-term success.
              </p>
            </CardContent>
          </Card>

          <Card className="h-fit lg:h-[680px] bg-[#DEE8F2] text-[#1E293B] text-lg border-[#1E293B] group">
            <CardHeader>
              <CardTitle>Our Comprehensive Approach</CardTitle>
              <div className="bg-linear-to-r from-[#1E293B] to-transparent w-44 h-px" />
            </CardHeader>

            <CardContent className="space-y-6">
              <Image
                src="/images/approach.svg"
                alt="comprehensive approach"
                width={350}
                height={350}
                className="mx-auto hidden sm:block group-hover:scale-105 transition-transform duration-200"
              />

              <p>
                We offer a connected ecosystem that supports your entire
                business journey—from company registration and trademark
                protection to ongoing tax compliance and growth support. Our
                integrated team of experts provides holistic solutions that save
                time and ensure 100% compliance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export { WhyTaxocity };
