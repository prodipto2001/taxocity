"use client";

import * as React from "react";
import { useModalOpen } from "@/context/modal";
import { MODAL_INTERVAL } from "@/lib/constants";

export function ModalAutoTrigger() {
  const { isOpen, setIsOpen, setModalSource } = useModalOpen();
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const userInteractedWithFormRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const hasAutoOpened = sessionStorage.getItem("modal_auto_opened");

    if (hasAutoOpened) return;

    // if modal is opened manually (from header, CTA, etc.), prevent auto-trigger
    if (isOpen) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      sessionStorage.setItem("modal_auto_opened", "true");
      return;
    }

    // detect if user is interacting with form inputs
    const handleFormInteraction = () => {
      const activeElement = document.activeElement;
      const isFormElement =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement;

      if (isFormElement) {
        // user started typing in form - abort auto-trigger permanently
        userInteractedWithFormRef.current = true;

        // clear the timer - modal will never auto-trigger now
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }

        // mark as if modal was already opened to prevent any future auto-trigger
        sessionStorage.setItem("modal_auto_opened", "true");
      }
    };

    // initial timer
    timerRef.current = setTimeout(() => {
      // only trigger if user hasn't interacted with form
      if (!userInteractedWithFormRef.current) {
        const activeElement = document.activeElement;
        const isTypingInForm =
          activeElement instanceof HTMLInputElement ||
          activeElement instanceof HTMLTextAreaElement ||
          activeElement instanceof HTMLSelectElement;

        if (!isTypingInForm) {
          setModalSource("cta");
          setIsOpen(true);
          sessionStorage.setItem("modal_auto_opened", "true");
        }
      }
    }, MODAL_INTERVAL);

    // listen for focus and input events to detect form interaction
    document.addEventListener("focusin", handleFormInteraction);
    document.addEventListener("input", handleFormInteraction);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      document.removeEventListener("focusin", handleFormInteraction);
      document.removeEventListener("input", handleFormInteraction);
    };
  }, [isOpen, setIsOpen, setModalSource]);

  return null;
}