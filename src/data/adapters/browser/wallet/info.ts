/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { Wallet } from "@dynamic-labs/sdk-react-core";
import { publicClient } from "../pimlico/config";
import { balanceAbi } from "../web3/abis/erc20";
import { getTokenAddress } from "../web3/tokenAddresses";
import { getSmartAccountAddress } from "../pimlico/smartAccountClient";
import { formatUnits, type Address } from "viem";

const getFiatSellRate = () => {
  return Promise.resolve(1450);
};

const getTokenDecimals = async (tokenAddress: Address) => {
  return await publicClient.readContract({
    address: tokenAddress,
    abi: balanceAbi,
    functionName: "decimals",
  });
};

const getTokenBalance = async (
  tokenAddress: Address,
  walletAddress: Address,
) => {
  const bigBalance = await publicClient.readContract({
    address: tokenAddress,
    abi: balanceAbi,
    functionName: "balanceOf",
    args: [walletAddress],
  });

  return bigBalance;
};

const getUsdcBalance = async (dynamicWallet: Wallet) => {
  const usdcAddress = getTokenAddress("USDC");

  const userAddress = await getSmartAccountAddress(dynamicWallet);

  const [tokenBalance, decimals] = [
    await getTokenBalance(usdcAddress, userAddress),
    await getTokenDecimals(usdcAddress),
  ];

  return Number(formatUnits(tokenBalance, decimals));
};

const getWalletUsdcBalanceInfo = async (dynamicWallet: Wallet) => {
    const balance = await getUsdcBalance(dynamicWallet);

    const fiatRate = await getFiatSellRate();

    return {balance, fiatRate}
};

export { getUsdcBalance, getWalletUsdcBalanceInfo };