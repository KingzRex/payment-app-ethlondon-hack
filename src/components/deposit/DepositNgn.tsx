/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DepositFiatData,
  depositFiatSchema,
} from "@/data/schema/depositSchema";
import { TextInput } from "../form/TextInput";
import { SpinningLoader } from "../loaders/SpinninLoader";
import { beautifyNumericValue } from "@/utils/formatters";

interface DepositNgnProps {
  handleContinue: (amount: number) => Promise<void>;
  fiatRate: number;
  feePercent: number;
  defaultAmount?: number;
}

const DepositNgn: FC<DepositNgnProps> = ({
  fiatRate,
  handleContinue,
  feePercent,
  defaultAmount
}) => {
  const formMethods = useForm<DepositFiatData>({
    resolver: zodResolver(depositFiatSchema),
    mode: "onSubmit",
    defaultValues: {
      amount: defaultAmount,
    }
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = formMethods;

  const onSubmit = async (data: DepositFiatData) => {
    await handleContinue(data.amount);

    reset();
  };

  const amount = watch("amount");

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Deposit NGN</h2>
        <p>Naira deposited will be automatically converted to USDC.</p>
      </div>
      <FormProvider {...formMethods}>
        <form
          className="flex max-w-lg flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <TextInput
              id="amount"
              label="Enter Amount"
              name="amount"
              type="number"
              placeholder="5000"
            >
              <span>NGN</span>
            </TextInput>
          </div>

          <section className="flex flex-col gap-6">
            {Boolean(amount) && (
              <div className="flex flex-col gap-2 text-xs">
                <p className="flex items-center gap-2">
                  <span className="text-pd-black/70">Exchange Rate:</span>
                  <span>{fiatRate} NGN/USDC</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-pd-black/70">Fee:</span>
                  <span>
                    {beautifyNumericValue(amount * feePercent, 2)} NGN/
                    {beautifyNumericValue(
                      (amount * feePercent) / fiatRate,
                      2,
                    )}{" "}
                    USDC
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-pd-black/70">You&apos;ll get:</span>
                  <span>
                    {beautifyNumericValue(
                      (amount - amount * feePercent) / fiatRate,
                      2,
                    )}{" "}
                    USDC
                  </span>
                </p>
              </div>
            )}

            <button
              className="mx-auto flex max-w-[242px] items-center justify-center rounded-[2rem] bg-pd-blue px-[4.5rem] py-3 font-sans font-medium text-white disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex gap-2">
                  <SpinningLoader />
                </span>
              ) : (
                "Continue"
              )}
            </button>
          </section>
        </form>
      </FormProvider>
    </section>
  );
};

export default DepositNgn;