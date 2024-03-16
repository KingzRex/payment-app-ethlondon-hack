/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ConnectWithEmailProps {
  handleEmailConnect: (email: string) => Promise<void>;
  handleVerifyOtp: (otp: string) => Promise<void>;
}

const ConnectWithEmail: FC<ConnectWithEmailProps> = ({ handleEmailConnect, handleVerifyOtp }) => {

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [otp, setOtp] = useState<string | undefined>(undefined);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState<boolean>(false);

  const handleEmailChangeEvent: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target?.value)
  }

  const handleOTPChangeEvent: ChangeEventHandler<HTMLInputElement> = (event) => {
    setOtp(event.target?.value)
  }

  const onSubmitEmailHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();

      await handleEmailConnect(email!);

      setHasSubmittedEmail(true);

      const formElement: HTMLFormElement | null = document.querySelector(".email-form");

      if (formElement)
        formElement.reset();
      
    } catch (error: any) {

      setEmail(undefined);

      setHasSubmittedEmail(false);

      toast.error("Please retry!")
    }

  };

  const onSubmitOtpHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();

      const otp = event.currentTarget.otp.value;

      await handleVerifyOtp(otp);

      const formElement: HTMLFormElement | null = document.querySelector(".otp-form");

      if (formElement)
        formElement.reset();     

    } catch (error: any) {

      setEmail(undefined);
      setOtp(undefined);

      setHasSubmittedEmail(false);      

      toast.error("OTP Validation Failed\nPlease Try Again!")
    }
  };

  return (
    <section className='flex flex-col h-screen items-center justify-center border-solid border-white bg-indigo-500'>
      <ToastContainer />
      <div>
        <form key="email-form" className='email-form p-20 rounded-lg flex-col items-start mb-0' onSubmit={onSubmitEmailHandler} hidden={hasSubmittedEmail}>
          <input className="bg-white w-full block mb-7 p-4 rounded-lg active:bg-white focus:outline-none" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChangeEvent} />

          <button className="bg-indigo-500 hover:bg-white hover:border-indigo-500 hover:text-indigo-500 c p-3 rounded-lg border-2 w-full" type="submit" disabled={!email}>Submit</button>
        </form>

        <form key="otp-form" className='otp-form p-20 rounded-lg flex-col items-start' onSubmit={onSubmitOtpHandler} hidden={!hasSubmittedEmail}>
          <label className="mb-20 text-white">Please enter OTP sent to {email}</label>
          <input className="bg-white w-full block mb-7 p-4 rounded-lg active:bg-white focus:outline-none" type="text bg-inherit" name="otp" placeholder="OTP" value={otp} onChange={handleOTPChangeEvent} />
          <button className="bg-indigo-500 hover:bg-white hover:border-indigo-500 hover:text-indigo-500 c p-3 rounded-lg border-2 w-full" type="submit" disabled={!otp}>Submit</button>
        </form>
      </div>

    </section>
  );
};

export default ConnectWithEmail;