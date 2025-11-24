"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type * as React from "react";
import { ModalContextProvider } from "@/context/modal";
import { RecaptchaProvider } from "@/providers/recaptcha-provider";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecaptchaProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </RecaptchaProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
