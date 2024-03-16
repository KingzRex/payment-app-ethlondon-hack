import { CopyIcon, type Wallet } from "@dynamic-labs/sdk-react-core";
import type { FC } from "react";
import Skeleton from "react-loading-skeleton";
import useSWR from "swr";
import QRCode from "react-qr-code";
import Link from "next/link";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "react-toastify";

interface DepositUsdcProps {
  getSmartWalletAddress: (eoa: Wallet) => Promise<string>;
  dynamicEoaWallet: Wallet;
}

const DepositUsdc: FC<DepositUsdcProps> = ({
  getSmartWalletAddress,
  dynamicEoaWallet,
}) => {
  const key = "smart-wallet-address";

  const { data: smartWalletAddress, error } = useSWR<string, string>(key, () =>
    getSmartWalletAddress(dynamicEoaWallet),
  );

  const [_, copyText] = useCopyToClipboard();

  const handleCopyWalletAddress = async (walletAddress: string) => {
    try {
      await copyText(walletAddress);

      toast.success("Wallet address copied");
    } catch (error) {
      toast.error("Copy failed");
    }
  };

  if (error) return <div>Error loading wallet</div>;

  if (!smartWalletAddress)
    return (
      <section className="flex flex-col gap-10">
        <h2 className="text-xl font-medium">Deposit USDC</h2>
        <div className="flex justify-center">
          <Skeleton height={160} width={160} />
        </div>
        <div className="flex flex-col items-center gap-6">
          <Skeleton height={60} width={300} />
          <Skeleton height={60} width={300} />
        </div>
      </section>
    );

  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-xl font-medium">Deposit USDC</h2>
      <div className="flex justify-center">
        <QRCode width={160} height={160} value={smartWalletAddress} />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 rounded-md bg-pd-skyBlue px-4 py-2.5">
          <p className="text-sm font-medium">Wallet Address</p>
          <p className="w-full truncate text-xs">{smartWalletAddress}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button
            className="flex max-w-[242px] items-center justify-center gap-2.5 rounded-[2rem] bg-pd-blue px-[2rem] py-3 font-medium text-white"
            type="button"
            onClick={async () =>
              await handleCopyWalletAddress(smartWalletAddress)
            }
          >
            <CopyIcon /> <span>Copy Wallet Address</span>
          </button>
          <Link href="/dashboard" className="underline">
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DepositUsdc;