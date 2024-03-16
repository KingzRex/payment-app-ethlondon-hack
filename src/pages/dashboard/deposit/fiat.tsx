/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NgnDepositDetails from "@/components/deposit/NgnDepositDetails";
import AppLayout from "@/components/layouts/AppLayout";
import { getDepositBankDetails } from "@/data/adapters/browser/deposit/fiat";
import type { NextPageWithLayout } from "@/pages/_app";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

type FiatDepositPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const FiatDepositPage: NextPageWithLayout<FiatDepositPageProps> = ({
  amount,
  bankDetails,
}) => {
  return <NgnDepositDetails bankDetails={bankDetails} amount={amount} />;
};

FiatDepositPage.getLayout = (page) => (
  <AppLayout
    previousHref={{
      pathname: "/dashboard/deposit/fiat-converter",
      query: { amount: page.props.amount },
    }}
  >
    {page}
  </AppLayout>
);

export default FiatDepositPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const amountQuery = context.query.amount as string;

  const amount = Number(amountQuery);

  const bankDetails = await getDepositBankDetails();

  return {
    props: {
      bankDetails,
      amount: isNaN(amount) ? 0 : amount,
    },
  };
};