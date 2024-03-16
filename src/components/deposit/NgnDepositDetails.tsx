import { beautifyNumericValue } from "@/utils/formatters";
import { CopyIcon } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import { useState, type FC } from "react";
import { toast } from "react-toastify";
import { useCopyToClipboard } from "usehooks-ts";
import { SpinningLoader } from "../loaders/SpinninLoader";

interface NgnDepositDetailsProps {
  amount: number;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
  handleConfirmDeposit: () => Promise<void>;
}

const NgnDepositDetails: FC<NgnDepositDetailsProps> = ({
  amount,
  bankDetails,
  handleConfirmDeposit,
}) => {
  const [_, copyText] = useCopyToClipboard();

  const [confirming, setConfirming] = useState(false);

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Make Deposit</h2>
        <p>
          Please deposit the following amount using the account details provided
          below:
        </p>
      </div>
      <h2 className="text-center text-2xl font-bold">
        NGN {beautifyNumericValue(amount, 2)}
      </h2>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 text-sm">
          <p className="flex items-center justify-between gap-4">
            <span>Bank:</span>
            <span>{bankDetails.bankName}</span>
          </p>
          <p className="flex items-center justify-between gap-4">
            <span>Account Name:</span>
            <span>{bankDetails.accountName}</span>
          </p>
          <p className="flex items-center justify-between gap-4">
            <span>Account Number:</span>
            <span className="flex items-center gap-1.5">
              <button
                onClick={async () => {
                  await copyText(bankDetails.accountNumber);

                  toast.success("Account number copied");
                }}
                title="copy account number"
              >
                <CopyIcon />
              </button>
              <span>{bankDetails.accountNumber}</span>
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={async () => {
              try {
                setConfirming(true);

                await handleConfirmDeposit();

                toast.success("Deposit confirmed");
              } catch (error) {
                toast.error("Error confirming deposit");
              } finally {
                setConfirming(false);
              }
            }}
            className="mx-auto flex max-w-[242px] items-center justify-center gap-2.5 rounded-[2rem] bg-pd-blue px-[1.5rem] py-3 font-sans font-medium text-white disabled:opacity-60"
            type="button"
          >
            {confirming ? <SpinningLoader /> : <span>Confirm</span>}
          </button>
          <Link href="/dashboard" className="underline">
            Go to Home
          </Link>
        </div>
      </section>
    </section>
  );
};

export default NgnDepositDetails;