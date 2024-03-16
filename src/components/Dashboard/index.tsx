import React from "react";
import { Deposit, Hamburger, Invest, Send } from "../svg-icons";
import TransactionHistory from "./TransactionHistory";
import type { Transaction } from "@/types";
import WalletBalance from "./WalletBalance";

interface WalletBalanceInfo {
  balance: number;
  fiatRate: number;
}

interface DashboardProps {
  getWalletBalanceInfo: () => Promise<WalletBalanceInfo>;
  fetchTransactions: () => Promise<Transaction[]>;
}

const Dashboard: React.FC<DashboardProps> = ({
  getWalletBalanceInfo,
  fetchTransactions,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="font-medium">My Dashboard</p>
        <WalletBalance getWalletBalanceInfo={getWalletBalanceInfo} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-pd-blue py-4 text-white">
          <div className="mx-auto w-fit">
            <Deposit />
          </div>
          <p className="text-center font-medium ">Deposit</p>
        </div>
        <div className="rounded-lg bg-pd-pink py-4 text-white ">
          <div className="mx-auto w-fit">
            <Send />
          </div>
          <p className="text-center font-medium ">Send</p>
        </div>
        <div className="rounded-lg bg-pd-green py-4 text-white ">
          <div className="mx-auto w-fit">
            <Invest />
          </div>
          <p className="text-center font-medium ">Invest</p>
        </div>
      </div>
      <TransactionHistory fetchTransactions={fetchTransactions} />
    </div>
  );
};

export default Dashboard;