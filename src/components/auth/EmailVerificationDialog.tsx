/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState, type FC } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useModalContainer } from "@/lib/context/ModalContainer";
import { Close } from "@/components/svg-icons";
import { PinInput } from "../form/PinInput";

interface EmailVerificationDialogProps {
  handleVerifyOtp: (otp: string) => Promise<void>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resendOtp: () => void;
}

const EmailVerificationDialog: FC<EmailVerificationDialogProps> = ({
  handleVerifyOtp,
  isOpen,
  resendOtp,
  onOpenChange,
}) => {
  const { container } = useModalContainer();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handlePinChange = (pin: string) => {
    if (pin.length === 6) {
      void handleVerifyOtp(pin);
    }
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isResendDisabled && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(intervalId);
  }, [isResendDisabled, countdown]);

  const handleResendClick = async () => {
    try {
      resendOtp();
      setIsResendDisabled(true);
      setCountdown(10);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-50 bg-pd-black/85 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex  w-fit max-w-[350px]  flex-col space-y-6 rounded-lg bg-white p-5 pb-12 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none "
          >
            <div className="flex flex-col space-y-1 ">
              <Dialog.Close asChild>
                <button
                  className="right-[10px] top-[10px] inline-flex  appearance-none items-center justify-center self-end rounded-full"
                  aria-label="Close"
                  type="button"
                >
                  <Close />
                </button>
              </Dialog.Close>

              <Dialog.Title className=" text-center text-xl font-medium text-pd-black ">
                Email Verification
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-center text-[12px]">
                Please input the OTP sent to your email address.
              </Dialog.Description>
            </div>
            <PinInput autoFocus={true} onChange={handlePinChange} />

            <div className="mx-auto flex w-fit items-center space-x-1 text-[12px] text-pd-black">
              <p>Didn&apos;t get OTP?</p>
              <button
                className={`font-medium underline ${isResendDisabled ? "text-gray-500" : "text-blue-600"}`}
                onClick={handleResendClick}
                disabled={isResendDisabled}
              >
                {isResendDisabled ? `Resend in ${countdown}s` : "Resend"}
              </button>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EmailVerificationDialog;