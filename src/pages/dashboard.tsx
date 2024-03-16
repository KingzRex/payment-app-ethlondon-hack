/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Dashboard from "@/components/Dashboard";
import type { Transaction } from "@/types";
import React from "react";
import type { NextPageWithLayout } from "./_app";
import AppLayout from "@/components/layouts/AppLayout";

const DashboardPage: NextPageWithLayout = () => {
  const getDummyWalletBalance = () =>
    new Promise<{
      balance: number;
      fiatRate: number;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          balance: 3000,
          fiatRate: 1450,
        });
      }, 3000);
    });

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

  return (
      <Dashboard
        getWalletBalanceInfo={getDummyWalletBalance}
        fetchTransactions={fetchTransactionsDummy}
      />
  );
};

DashboardPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default DashboardPage;