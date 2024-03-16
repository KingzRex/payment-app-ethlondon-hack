/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { createPublicClient, http } from "viem";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { polygon, polygonMumbai } from "viem/chains";
import { env } from "@/env";

const chain = env.NEXT_PUBLIC_WEB3_ENV === "testnet" ? polygonMumbai : polygon;

const PIMLICO_API_KEY = env.NEXT_PUBLIC_PIMLICO_API_KEY;
const PIMILICO_CHAIN_NAME =
  env.NEXT_PUBLIC_WEB3_ENV === "testnet" ? "mumbai" : "polygon";

const RPC_URL =
  env.NEXT_PUBLIC_WEB3_ENV === "testnet"
    ? "https://rpc.ankr.com/polygon_mumbai"
    : "http://rpc.ankr.com/polygon";

export const publicClient = createPublicClient({
  transport: http(RPC_URL),
});

const pimlicoTransport = http(
  `https://api.pimlico.io/v2/${PIMILICO_CHAIN_NAME}/rpc?apikey=${PIMLICO_API_KEY}`,
);

export const paymasterClient = createPimlicoPaymasterClient({
  transport: pimlicoTransport,
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});

const bundlerTransport = pimlicoTransport;

export { ENTRYPOINT_ADDRESS_V06, chain, bundlerTransport };