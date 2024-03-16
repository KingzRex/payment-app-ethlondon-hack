import type { ComponentProps, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormErrorMessage } from "./FormErrorMessage";

type TextInputProps = ComponentProps<"input"> & {
  name: string;
  id: string;
  label: string;
  placeholder: string;
  type: "number" | "text" | "email" | "tel";
  children?: ReactNode;
  hideArrows?: boolean;
};

const TextInput = ({
  id,
  label,
  name,
  placeholder,
  type = "text",
  className,
  children,
  autoFocus,
  onWheel,
  hideArrows,
  step,
}: TextInputProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<Record<typeof name, string | number>>();

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="text-pd-black text-sm font-medium md:text-base"
      >
        {label}
      </label>

      <div
        className={twMerge(
          "border-pd-gray  relative flex items-center justify-between gap-2 rounded border p-4 ",
          errors[name]
            ? "focus-within:border-pd-red"
            : "focus-within:border-pd-blue",
          className,
        )}
      >
        <input
          id={id}
          disabled={isSubmitting}
          {...register(name)}
          placeholder={placeholder}
          type={type}
          step={step}
          autoFocus={autoFocus}
          className={twMerge(
            "w-full shrink border-0 border-none focus:outline-none",
            hideArrows &&
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          )}
          onWheel={onWheel}
        />
        {children ?? null}
      </div>

      <FormErrorMessage error={errors[name]} id={`${name}-error`} />
    </div>
  );
};

export { TextInput };