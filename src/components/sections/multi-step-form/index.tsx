"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
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
      const { name, email, countryCode, phone, state } = form.getValues();
      const fullPhone = `${countryCode} ${phone}`;

      // updating telecrm
      await teleCRMMutation.mutateAsync({
        name,
        email,
        phone: fullPhone,
        state,
      });

      // updating google sheets
      await googleSheetsMutation.mutateAsync({
        phone: fullPhone,
        email,
        name,
        state,
        payment_status: "pending",
      });

      const userData = { name, email, phone: fullPhone, state };
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
    }
  }

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
    />
  );
}

export { MultiStepForm };
