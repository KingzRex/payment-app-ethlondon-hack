import type { FC } from "react";
import AuthCode from "react-auth-code-input";

interface PinInputProps {
  onChange: (pin: string) => void;
  autoFocus?: boolean;
}

const PinInput: FC<PinInputProps> = ({ onChange, autoFocus = false }) => {
  return (
    <AuthCode
      onChange={(value: string) => {
        onChange(value);
      }}
      autoFocus={autoFocus}
      containerClassName="flex gap-[9px] justify-between w-full"
      length={6}
      inputClassName="w-[45px] h-[45px] text-pd-black text-lg text-center rounded-lg focus:outline-none bg-pd-gray-3 focus:border focus:border-pd-blue"
    />
  );
};

export { PinInput };