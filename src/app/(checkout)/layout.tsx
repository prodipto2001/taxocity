import { Info } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { Rating } from "@/components/ui/rating";
import { COMPANY_LOGOS, TESTIMONIALS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import { ContactUs } from "@/components/sections/order-review/contact-us";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-sans py-28 md:py-32 px-2 md:px-16">
      <div className="mx-auto max-w-[1256px] flex flex-col-reverse xl:flex-row">
        <div className="w-auto xl:max-w-[550px] space-y-6 md:space-y-12 py-14 px-6 md:px-12 mt-12 md:mt-0">
          <div className="relative flex w-full flex-col items-center justify-center gap-20 overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s] [--gap:100px]">
              {COMPANY_LOGOS.map((logo, index) => (
                <BrandCard key={`${logo}-${index + 1}`} {...logo} />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-linear-to-r" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-linear-to-l" />
          </div>

          <h1 className="text-2xl font-bold leading-[120%] text-center">
            Hear why countless entrepreneurs <br /> choose Taxocity.
          </h1>

          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s]  [--gap:32px]">
              {TESTIMONIALS.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  {...testimonial}
                />
              ))}
            </Marquee>
            <div className="from-background to-transparent pointer-events-none absolute inset-y-0 -left-0.5 w-5 md:w-14 bg-linear-to-r" />
            <div className="from-background to-transparent pointer-events-none absolute inset-y-0 -right-0.5 w-5 md:w-14 bg-linear-to-l" />
          </div>

          <ContactUs />
        </div>

        <div className="space-y-12 px-2 py-12 md:py-14 md:px-12 bg-[#B3DBFF]/10">
          <div>
            <Image
              src="/logos/taxocity.png"
              alt="Taxocity logo"
              width={207}
              height={93}
              className="mx-auto w-[142px] md:w-[207px]"
            />

            <p className="text-center text-lg leading-tight">
              Experience seamless legal drafting, faster MCA approvals, and a
              fully guided online registration process. All in one place.
            </p>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}

const BrandCard = ({
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

const TestimonialCard = ({
  rating,
  image,
  name,
  position,
  company,
  message,
}: {
  rating: number;
  image: string | null;
  name: string;
  position: string | null;
  company: string | null;
  message: string;
}) => {
  return (
    <figure className="relative h-full flex flex-col justify-between max-w-[390px] cursor-pointer overflow-hidden rounded-xl border p-4">
      <div>
        <Rating rating={rating} />
        <blockquote className="mt-2.5 mb-6 text-lg">{message}</blockquote>
      </div>
      <div className="flex flex-row items-center gap-4">
        {image ? (
          <Image
            className="rounded-full"
            width="56"
            height="56"
            alt="customer avatar"
            src={image}
          />
        ) : (
          <span className="flex items-center justify-center size-14 bg-neutral-200 rounded-full">
            {getInitials(name)}
          </span>
        )}
        <div className="flex flex-col">
          <figcaption className="text-lg dark:text-white font-semibold">
            {name}
          </figcaption>
          <p className="font-medium dark:text-white/40">
            {position ? <span>{position},</span> : null} {company}
          </p>
        </div>
      </div>
    </figure>
  );
};
