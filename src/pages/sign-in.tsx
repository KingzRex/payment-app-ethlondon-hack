import SignInForm from "@/components/auth/EmailSignInForm";
import { APP_NAME } from "@/utils/constants";
import React, { useState } from "react";
import { useConnectWithEmailOtp } from "@dynamic-labs/sdk-react-core";
import { toast } from "react-toastify";
import EmailVerificationDialog from "@/components/auth/EmailVerificationDialog";

const SignInPage = () => {
  const { connectWithEmail, verifyOneTimePassword } = useConnectWithEmailOtp();

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
    try {
      await verifyOneTimePassword(otp);
      toast.success("Email verified");
      setShowOtpModal(false);
    } catch (error) {
      console.error(error);
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