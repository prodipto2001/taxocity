import Image from "next/image";
import { Rating } from "@/components/ui/rating";

function GoogleReviews() {
  return (
    <div className="flex items-center justify-center md:justify-start gap-2">
      <Image
        src="/images/google-reviews.png"
        alt="google reviews"
        width={64}
        height={36}
      />

      <div className="w-px h-6 bg-muted-foreground" />

      <Rating rating={4.8} showDivider={false} />
      <span className="font-medium text-[#F99F0E]">(15k+ Reviews)</span>
    </div>
  );
}

export { GoogleReviews };
