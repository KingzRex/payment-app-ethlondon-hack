import Dashboard from "@/components/Dashboard";
import type { Transaction } from "@/types";
import React from "react";
import type { NextPageWithLayout } from "../_app";
import AppLayout from "@/components/layouts/AppLayout";
import { getWalletUsdcBalanceInfo } from "@/data/adapters/browser/wallet/info";
import {
  useDynamicContext,
  useUserWallets,
  useEmbeddedWallet,
} from "@dynamic-labs/sdk-react-core";
import FallbackCreateWallet from "@/components/wallet/FallbackCreateWallet";
import { SpinningLoader } from "@/components/loaders/SpinninLoader";

const DashboardPage: NextPageWithLayout = () => {
  const wallets = useUserWallets();
  const { userHasEmbeddedWallet } = useEmbeddedWallet();
  const { sdkHasLoaded } = useDynamicContext();

  const primaryWallet = wallets[0];

  const getWalletBalanceInfo = async () => {
    if (!primaryWallet) throw new Error("Wallet not loaded");

    return await getWalletUsdcBalanceInfo(primaryWallet);
  };

  const fetchTransactionsDummy = async (): Promise<Transaction[]> => {
    return Promise.resolve([
      {
        name: "James Williams",
        amount: "15.00",
        transactionType: "Send",
        date: "2023-03-10",
      },
      {
        name: "James Williams",
        amount: "10",
        transactionType: "Deposit",
        date: "2023-03-09",
      },
    ]);
  };

  if (sdkHasLoaded && !userHasEmbeddedWallet()) return <FallbackCreateWallet />;

  if (!primaryWallet)
    return (
      <div className="flex justify-center px-6 py-8 text-pd-blue">
        <SpinningLoader />
      </div>
    );

  return (
    <Dashboard
      getWalletBalanceInfo={getWalletBalanceInfo}
      fetchTransactions={fetchTransactionsDummy}
    />
  );
};

DashboardPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default DashboardPage;