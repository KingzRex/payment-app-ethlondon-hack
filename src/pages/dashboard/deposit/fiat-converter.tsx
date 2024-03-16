import DepositNgn from "@/components/deposit/DepositNgn";
import AppLayout from "@/components/layouts/AppLayout";
import { SpinningLoader } from "@/components/loaders/SpinninLoader";
import { getFiatRateAndFee } from "@/data/adapters/browser/deposit/fiat";
import type { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import useSWR from "swr";

const FiatConverterPage: NextPageWithLayout = () => {
  const router = useRouter();

  const amountQuery = Number(router.query.amount as string);

  const defaultAmount = isNaN(amountQuery) ? undefined : amountQuery;

  const key = "fiat-converter-rate";

  const { data, error } = useSWR<
    Awaited<ReturnType<typeof getFiatRateAndFee>>,
    string
  >(key, () => getFiatRateAndFee());

  if (error) return <div>Error loading rate and fee</div>;

  if (!data)
    return (
      <div className="flex justify-center px-6 py-8 text-pd-blue">
        <SpinningLoader />
      </div>
    );

  const handleContinue = async (amount: number) => {
    await router.push(`/dashboard/deposit/fiat?amount=${amount}`);
  };

  return (
    <DepositNgn
      defaultAmount={defaultAmount}
      handleContinue={handleContinue}
      feePercent={data.feePercent}
      fiatRate={data.rate}
    />
  );
};

FiatConverterPage.getLayout = (page) => (
  <AppLayout previousHref="/dashboard">{page}</AppLayout>
);

export default FiatConverterPage;