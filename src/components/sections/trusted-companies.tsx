import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { COMPANY_LOGOS } from "@/lib/constants";

export function TrustedCompanies() {
  return (
    <section className="px-4 md:px-16 py-18 md:py-32">
      <div className="mx-auto max-w-[1256px] flex flex-col items-center gap-6 md:gap-20">
        <div className="space-y-2">
          <h2 className="text-[32px] md:text-5xl font-bold text-center text-[#1E293B]">
            Brands that trust us
          </h2>
          <p className="md:text-lg text-center px-8 md:px-0 text-[#3F3F3F]">
            Over 1000+ companies incorporated in last 30 years
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center gap-20 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s] [--gap:100px]">
            {COMPANY_LOGOS.map((logo, index) => (
              <ReviewCard key={`${logo}-${index + 1}`} {...logo} />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-linear-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-linear-to-l" />
        </div>
      </div>
    </section>
  );
}

const ReviewCard = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  bgColor: string;
}) => {
  return (
    <figure
      className="relative h-full cursor-pointer overflow-hidden flex items-center"
      // style={{ backgroundColor: bgColor }}
    >
      <Image
        src={src ?? "/images/avatar-fallback.png"}
        alt={alt}
        width={width}
        height={height}
      />
    </figure>
  );
};
