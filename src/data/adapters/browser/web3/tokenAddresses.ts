import { env } from "@/env";
import type { Address } from "viem";

type SupportedTokens = "USDC";

type TokenAddresses = {
  [key in SupportedTokens]: {
    [key in typeof env.NEXT_PUBLIC_WEB3_ENV]: Address;
  };
};

const tokenAddresses: TokenAddresses = {
  USDC: {
    mainnet: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    testnet: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97",
  },
};

const getTokenAddress = (
  token: SupportedTokens,
  environment: typeof env.NEXT_PUBLIC_WEB3_ENV = env.NEXT_PUBLIC_WEB3_ENV,
) => {
  return tokenAddresses[token][environment];
};

export { getTokenAddress };