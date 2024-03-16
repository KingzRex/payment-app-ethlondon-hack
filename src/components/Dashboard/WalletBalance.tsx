/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FC } from "react";
import useSWR from "swr";
import { DashboardVector, Eyes, USDCLogo } from "../svg-icons";
import Skeleton from "react-loading-skeleton";
import { beautifyNumericValue } from "@/utils/formatters";

interface WalletBalanceInfo {
  balance: number;
  fiatRate: number;
}

interface WalletBalanceInfoProps {
  getWalletBalanceInfo: () => Promise<WalletBalanceInfo>;
}

const WalletBalance: FC<WalletBalanceInfoProps> = ({
  getWalletBalanceInfo,
}) => {
  const key = "wallet-info";

  const { data: walletBalanceInfo } = useSWR(key, () => getWalletBalanceInfo());

  const walletBalance = walletBalanceInfo?.balance;
  const sellRate = walletBalanceInfo?.fiatRate;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-[159px] w-full rounded-xl bg-pd-black p-4">
        <div className="absolute bottom-0">
          <DashboardVector />
        </div>
        <div className="flex items-center justify-between">
          <p className="flex items-center space-x-1 text-white">
            <span> Wallet Balance</span>
            <span className="">
              <Eyes />
            </span>
          </p>
          <p className="flex items-center space-x-1 rounded bg-white px-2 py-[5px]">
            <span>
              <USDCLogo />
            </span>{" "}
            <span> USDC</span>
          </p>
        </div>
        <p className="text-[40px] font-medium text-white ">
          {walletBalance !== undefined ? (
            beautifyNumericValue(walletBalance, 2)
          ) : (
            <Skeleton width={180} />
          )}
        </p>
      </div>

      <div className="rounded-lg bg-pd-skyBlue p-4 text-pd-black">
        <div className="flex items-center justify-between">
          <p className="font-medium">Exchange Rate</p>
          <p className="text-[10px] font-medium">
            {sellRate !== undefined ? (
              <>{sellRate} NGN/USDC</>
            ) : (
              <Skeleton width={90} />
            )}
          </p>
        </div>
        <p className="mt-1 text-[10px]">
          {sellRate !== undefined && walletBalance !== undefined ? (
            <>
              Current NGN balance:{" "}
              <span className=" text-pd-blue">
                ₦{beautifyNumericValue(sellRate * walletBalance, 2)}
              </span>
            </>
          ) : (
            <Skeleton width={140} />
          )}
        </p>
      </div>
    </div>
  );
};

export default WalletBalance;