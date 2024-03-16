import { useEmbeddedWallet } from "@dynamic-labs/sdk-react-core";
import type { FC } from "react";
import { toast } from "react-toastify";

const FallbackCreateWallet: FC = () => {
    const { createEmbeddedWallet } = useEmbeddedWallet();

    const handleWalletCreation = async () => {
        const toastId = toast.loading("Creating wallet...");

        try {
            await createEmbeddedWallet();

            toast.dismiss(toastId);
            toast.success("Wallet created successfully");
        } catch (err) {
            toast.dismiss(toastId);
            toast.error("Failed to create wallet");
        }
    };

    return (
        <section className="flex flex-col items-center justify-center gap-6 rounded-md border px-14 py-12">
            <p className="text-center">Automatic wallet creation was interrupted ⚠️</p>
            <button
                className="flex items-center justify-center gap-2.5 rounded-[2rem] bg-pd-blue px-[3.6rem] py-4 font-medium text-white"
                type="button"
                onClick={handleWalletCreation}
            >
                Re-create Wallet
            </button>
        </section>
    );
};

export default FallbackCreateWallet;