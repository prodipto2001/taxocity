"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import type * as React from "react";
import { env } from "@/env";

export function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SECRET_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
