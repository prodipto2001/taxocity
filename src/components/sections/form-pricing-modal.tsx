"use client";

import { MultiStepForm } from "@/components/sections/multi-step-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalOpen } from "@/context/modal";

function FormPricingModal() {
  const { isOpen, setIsOpen, modalSource } = useModalOpen();

  const isSourcePricingCards = modalSource === "pricing";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="font-sans gap-6">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-4xl font-bold">
            Register your private ltd. company
          </DialogTitle>
        </DialogHeader>
        <div>
          <MultiStepForm isSourcePricingCards={isSourcePricingCards} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { FormPricingModal };
