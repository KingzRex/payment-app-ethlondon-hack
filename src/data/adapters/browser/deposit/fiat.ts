import type { Address } from "viem";
import customAxios from "../../axios";
import { APP_NAME } from "@/utils/constants";

const getFeePercent = () => {
  const PERCENT = 100;

  const feePercent = 0.2 / PERCENT;

  return Promise.resolve(feePercent);
};

const getDepositFiatRate = () => {
  return Promise.resolve(1500);
};

const getFiatRateAndFee = async () => {
  const rate = await getDepositFiatRate();

  const feePercent = await getFeePercent();

  return {
    rate,
    feePercent,
  };
};

const getDepositBankDetails = () => {
  // Todo: return a new/existing virtual account details for the user.

  return Promise.resolve({
    accountName: `${APP_NAME} - VA001`,
    accountNumber: "1234567890",
    bankName: "Wema Bank",
  });
};

interface CreateDepositTransactionParams {
  userWalletAddress: Address;
  fiatAmount: number;
}

const createDepositTransaction = async(authToken: string, params: CreateDepositTransactionParams) => {
  const response = await customAxios.post<{
    message: string;
    data: {
      id: string;
    }
  }>("/deposit", params, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return response.data.data.id;
}

const confirmDepositTransaction = async (
  authToken: string,
  depositId: string,
) => {
  const response = await customAxios.post(
    "/deposit/confirm",
    {
      depositId,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );

  return response.status === 200;
};

export {
  getFiatRateAndFee,
  getDepositBankDetails,
  createDepositTransaction,
  confirmDepositTransaction,
};