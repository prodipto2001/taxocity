"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useModalOpen, useUserContext } from "@/context/modal";
import { useGoogleSheetsMutation } from "@/lib/hooks/useGoogleSheetsMutation";
import { useTeleCRMMutation } from "@/lib/hooks/useTeleCRMMutation";
import { setCookie } from "@/lib/utils/cookies";
import { type FormSchema, formSchema } from "./form-schema";
import { UserDetailsForm } from "./user-details";

function MultiStepForm({
  isSourcePricingCards = false,
}: {
  isSourcePricingCards?: boolean;
}) {
  const router = useRouter();
  const modalState = useModalOpen();
  const userState = useUserContext();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      state: "",
    },
  });

  const teleCRMMutation = useTeleCRMMutation();
  const googleSheetsMutation = useGoogleSheetsMutation();
  const [recaptchaError, setRecaptchaError] = React.useState<string | null>(
    null,
  );
  const [ipAddress, setIpAddress] = React.useState<string | undefined>(
    undefined,
  );

  async function onSubmit() {
    const step1Fields = [
      "name",
      "email",
      "countryCode",
      "phone",
      "state",
    ] as const;
    const isStep1Valid = await form.trigger(step1Fields);

    if (isStep1Valid) {
      try {
        setRecaptchaError(null);

        // Execute reCAPTCHA verification
        if (!executeRecaptcha) {
          setRecaptchaError(
            "reCAPTCHA not loaded. Please refresh the page and try again.",
          );
          return;
        }

        const recaptchaToken = await executeRecaptcha("submit_form");

        // Verify reCAPTCHA token with backend
        const verificationResponse = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: recaptchaToken }),
        });

        const verificationData = await verificationResponse.json();

        if (!verificationData.success) {
          setRecaptchaError(
            verificationData.message ||
              "reCAPTCHA verification failed. Please try again.",
          );
          return;
        }

        const { name, email, countryCode, phone, state } = form.getValues();
        const fullPhone = `${countryCode} ${phone}`;

        // generating unique order_id
        const orderId = `TAX${nanoid(10)}`;

        // updating telecrm
        await teleCRMMutation.mutateAsync({
          name,
          email,
          phone: fullPhone,
          state,
        });

        // updating google sheets
        await googleSheetsMutation.mutateAsync({
          order_id: orderId,
          phone: fullPhone,
          email,
          name,
          state,
          payment_status: "pending",
          ip_address: ipAddress,
        });

        const userData = { name, email, phone: fullPhone, state, orderId };
        userState.setUser(userData);

        try {
          localStorage.setItem("user_data", JSON.stringify(userData));
        } catch (error) {
          console.error("Failed to save user data to localStorage.", error);
        }
        setCookie("form_completed", "true", 1); // valid for 1 day

        if (isSourcePricingCards) {
          router.push("/order-review");
        } else {
          router.push("/pricing");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        setRecaptchaError(
          "An error occurred during verification. Please try again.",
        );
      }
    }
  }

  React.useEffect(() => {
    // Fetch IP address when component mounts
    const fetchIpAddress = async () => {
      try {
        const ipResponse = await fetch("/api/get-ip");
        const ipData = await ipResponse.json();
        if (ipData.success) {
          setIpAddress(ipData.ip);
        }
      } catch (error) {
        console.error("Failed to fetch IP address on mount:", error);
      }
    };

    fetchIpAddress();
  }, []);

  React.useEffect(() => {
    // resetting only when in modal flow and when modal closes
    if (!modalState.isOpen) {
      form.reset();
      // Note: We don't clear user data here as it's needed for the pricing page
    }
  }, [modalState.isOpen, form]);

  return (
    <UserDetailsForm
      form={form}
      handleNext={onSubmit}
      isSubmitting={teleCRMMutation.isPending || googleSheetsMutation.isPending}
      recaptchaError={recaptchaError}
    />
  );
}

export { MultiStepForm };
