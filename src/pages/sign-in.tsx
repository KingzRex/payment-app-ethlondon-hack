/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import SignInForm from "@/components/auth/EmailSignInForm";
import { APP_NAME } from "@/utils/constants";
import React, { useState } from "react";
import {
  useConnectWithEmailOtp,
  getAuthToken,
  useEmbeddedWallet,
} from "@dynamic-labs/sdk-react-core";
import { toast } from "react-toastify";
import EmailVerificationDialog from "@/components/auth/EmailVerificationDialog";
import { validateAuthToken } from "@/data/adapters/browser/auth/validateAuthToken";
import { useRouter } from "next/router";

const SignInPage = () => {
  const { connectWithEmail, verifyOneTimePassword } = useConnectWithEmailOtp();
  const { userHasEmbeddedWallet, createEmbeddedWallet } = useEmbeddedWallet();

  const router = useRouter();

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailSignIn = async (email: string) => {
    try {
      await connectWithEmail(email);

      toast.success("Email OTP sent");

      setEmail(email);
      setShowOtpModal(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email OTP");
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    const verifyingToastId = toast.loading("Verifying Email");

    try {
      await verifyOneTimePassword(otp);

      if (!userHasEmbeddedWallet()) {
        toast.dismiss(verifyingToastId);
        
        toast.loading("Creating wallet...", {
          toastId: verifyingToastId,
        });

        await createEmbeddedWallet();
      }

      const authToken = (await getAuthToken()) as string;

      const isAuthenticated = await validateAuthToken(authToken);

      setShowOtpModal(false);
      toast.dismiss(verifyingToastId);

      if (isAuthenticated) {
        await router.push("/dashboard");
        toast.success("Welcome");
      }
    } catch (error) {
      toast.dismiss(verifyingToastId);

      toast.error("Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await connectWithEmail(email);
      toast.success("Email OTP resent");
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend email OTP");
    }
  };
  return (
    <div className="mx-auto flex max-w-fit flex-col gap-[72px] rounded px-6 py-10 sm:my-5 sm:border">
      <h1 className="text-xl font-bold">{APP_NAME}</h1>
      <SignInForm handleSignIn={handleEmailSignIn} />

      {showOtpModal && (
        <EmailVerificationDialog
          isOpen={showOtpModal}
          resendOtp={handleResendOtp}
          onOpenChange={setShowOtpModal}
          handleVerifyOtp={handleVerifyOtp}
        />
      )}
    </div>
  );
};

export default SignInPage;