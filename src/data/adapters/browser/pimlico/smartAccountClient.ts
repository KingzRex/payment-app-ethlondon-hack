import type {
    Wallet as DynamicWallet,
} from '@dynamic-labs/sdk-react-core';
import { walletClientToSmartAccountSigner, createSmartAccountClient } from 'permissionless';
import { signerToSafeSmartAccount } from 'permissionless/accounts';
import type { WalletClient, Transport, Account, Chain } from 'viem';
import { publicClient, chain, bundlerTransport, paymasterClient, ENTRYPOINT_ADDRESS_V06 } from './config';
import { SAFE_VERSION } from '@/utils/constants';

const getSmartAccountSigner = async (wallet: DynamicWallet) => {
    const walletClient = await wallet.connector.getSigner<
        WalletClient<Transport, Chain, Account>
    >();

    return walletClientToSmartAccountSigner(walletClient);
};

async function getSmartAccountClient(wallet: DynamicWallet) {
    const signer = await getSmartAccountSigner(wallet);

    const safeAccount = await signerToSafeSmartAccount(publicClient, {
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        signer: signer,
        safeVersion: SAFE_VERSION,
    });    

    const smartAccountClient = createSmartAccountClient({
        account: safeAccount,
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        chain: chain,
        bundlerTransport: bundlerTransport,
        middleware: {
            sponsorUserOperation: paymasterClient.sponsorUserOperation,
        },
    });

    return smartAccountClient;
}

export { getSmartAccountClient }