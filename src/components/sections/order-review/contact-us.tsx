"use client";

import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

function ContactUs() {
  return (
    <div className="hidden xl:flex items-center justify-between">
      <h3 className="font-medium text-[#1E293B]">Need help with payment?</h3>
      <Button
        variant="outline"
        className="text-[#1E293B]"
        onClick={() => (window.location.href = "mailto:contact@taxocity.com")}
      >
        <Info className="size-4" /> Contact Us
      </Button>
    </div>
  );
}

function ContactUsButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="h-10 xl:hidden w-full text-[#1E293B]"
      onClick={() => (window.location.href = "mailto:contact@taxocity.com")}
    >
      <Info className="size-4" /> Contact Us
    </Button>
  );
}

export { ContactUs, ContactUsButton };
