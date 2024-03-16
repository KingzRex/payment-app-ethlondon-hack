/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Image from "next/image";
import React, { type FC } from "react";
import services from "@/images/service.png";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInSchemaType, signInSchema } from "@/data/schema/signInSchma";
import { TextInput } from "../form/TextInput";
import { SpinningLoader } from "../loaders/SpinninLoader";

interface SignInFormProps {
  handleSignIn: (email: string) => Promise<void>;
}

const SignInForm: FC<SignInFormProps> = ({ handleSignIn }) => {
  const formMethods = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = formMethods;

  const onSubmit = async (data: SignInSchemaType) => {
    await handleSignIn(data.email);

    reset();
  };

  return (
    <div>
      <p className="text-[32px] font-medium">Sign In</p>
      <p className="mt-2 text-base">
        Please input your email address to access simplified payments.
      </p>
      <FormProvider {...formMethods}>
        <form
          className="mt-4 flex max-w-lg flex-col gap-8 md:mt-6 md:gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            label="Email Address"
            name="email"
            id="email"
            placeholder="johndoe@xyz.com"
            type="email"
          />
          <button
            className="flex items-center justify-center rounded-[2rem] bg-pd-blue px-[4.5rem] py-4 font-medium text-white disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex gap-2">
                <SpinningLoader />
                <span>Signing in...</span>
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </FormProvider>

      <Image
        className="mx-auto mt-28"
        src={services}
        alt="Image"
        width={235}
        height={204}
      />
    </div>
  );
};

export default SignInForm;