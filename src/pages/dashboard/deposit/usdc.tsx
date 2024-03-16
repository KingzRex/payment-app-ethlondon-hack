import DepositUsdc from "@/components/deposit/DepositUsdc";
import AppLayout from "@/components/layouts/AppLayout";
import { SpinningLoader } from "@/components/loaders/SpinninLoader";
import FallbackCreateWallet from "@/components/wallet/FallbackCreateWallet";
import { getSmartAccountAddress } from "@/data/adapters/browser/pimlico/smartAccountClient";
import type { NextPageWithLayout } from "@/pages/_app";
import {
  useDynamicContext,
  useEmbeddedWallet,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";

const CryptoDepositPage: NextPageWithLayout = () => {
  const wallets = useUserWallets();
  const { userHasEmbeddedWallet } = useEmbeddedWallet();
  const { sdkHasLoaded } = useDynamicContext();

  const primaryWallet = wallets[0];

  if (sdkHasLoaded && !userHasEmbeddedWallet()) return <FallbackCreateWallet />;

  if (!primaryWallet)
    return (
      <div className="flex justify-center px-6 py-8 text-pd-blue">
        <SpinningLoader />
      </div>
    );

  return (
    <DepositUsdc
      dynamicEoaWallet={primaryWallet}
      getSmartWalletAddress={getSmartAccountAddress}
    />
  );
};

CryptoDepositPage.getLayout = (page) => (
  <AppLayout previousHref="/dashboard">{page}</AppLayout>
);

export default CryptoDepositPage;