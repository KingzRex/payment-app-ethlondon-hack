import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useModalContainer } from "@/lib/context/ModalContainer";
import { ArrowRight, Close, Deposit } from "@/components/svg-icons";
import Link from "next/link";

const DepositDialog = () => {
  const { container } = useModalContainer();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="rounded-lg bg-pd-blue py-4 text-white">
          <div className="mx-auto w-fit">
            <Deposit />
          </div>
          <p className="text-center font-medium">Deposit</p>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-50 bg-pd-black/85 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative flex w-full max-w-[346px] flex-col space-y-6 rounded-lg bg-white p-5 pb-12 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          >
            <div className="flex justify-between">
              <Dialog.Title className="mt-1 text-base font-medium text-pd-black">
                Deposit
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="inline-flex appearance-none items-center justify-center self-end rounded-full"
                  aria-label="Close"
                  type="button"
                >
                  <Close />
                </button>
              </Dialog.Close>
            </div>

            <Link
              href="/dashboard/deposit/fiat-converter"
              className="flex h-full w-full items-center justify-between rounded-lg bg-pd-skyBlue px-4 py-3"
            >
              <div className="flex flex-col space-y-1">
                <p className="text-pd-black2 text-[14px] font-medium">
                  Deposit NGN
                </p>
                <p className="text-[10px] text-pd-black">
                  Send Naira to your eth account
                </p>
              </div>
              <ArrowRight />
            </Link>

            <Link
              href="/dashboard/deposit/usdc"
              className="flex h-full w-full items-center justify-between rounded-lg bg-pd-skyBlue px-4 py-3"
            >
              <div className="flex flex-col space-y-1">
                <p className="text-pd-black2 text-[14px] font-medium">
                  Deposit USDC
                </p>
                <p className="text-[10px] text-pd-black">
                  Send Crypto to your eth account
                </p>
              </div>
              <ArrowRight />
            </Link>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DepositDialog;