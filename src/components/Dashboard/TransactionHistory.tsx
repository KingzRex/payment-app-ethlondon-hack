import type { Transaction } from "@/types";
import React, { type FC } from "react";
import useSWR from "swr";

interface TransactionHistoryProps {
  fetchTransactions: () => Promise<Transaction[]>;
}

const TransactionHistory: FC<TransactionHistoryProps> = ({
  fetchTransactions,
}) => {
  const key = "user-transactions";

  const { data: transactions, error } = useSWR<Array<Transaction>, string>(
    key,
    () => fetchTransactions(),
  );

  if (error) return <div>Error loading transactions</div>;

  if (!transactions) return <div>Loading...</div>;

  //TODO: retry installing date-fns and using it to format date
  return (
    <div>
      <h1 className="font-medium">Transaction History</h1>
      {transactions.length > 0 ? (
        <div className="text-pd-black-2 mt-4 flex flex-col gap-3 text-sm font-medium">
          {transactions.map((transaction, index) => (
            <div key={index} className="rounded bg-pd-gray-2 px-4 py-2.5">
              <div className="flex items-center justify-between">
                <p>{transaction.name}</p>
                <p
                  className={` ${
                    transaction.transactionType === "Send"
                      ? "text-pd-red"
                      : "text-pd-blue"
                  }`}
                >
                  {transaction.transactionType === "Send" ? "-" : "+"}
                  {transaction.amount} <span className="text-[10px]">USDC</span>{" "}
                </p>
              </div>
              <div className="flex items-center justify-between text-[12px] text-pd-black">
                <p>{transaction.transactionType}</p>
                <p>{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-pd-black-2 mt-6">
          <p className="text-center text-sm font-medium">No transactions yet</p>
          <p className="mx-auto w-[209px] text-center text-[12px]">
            As you use the website, your recent transactions will appear here.
          </p>
          <div className="mx-auto mt-4 w-[191px] rounded-[100px] bg-pd-blue py-2 text-center text-[14px] font-medium text-white">
            Deposit{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;