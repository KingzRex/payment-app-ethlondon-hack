import type { FC } from "react";
import type { FieldError } from "react-hook-form";

interface FormErrorMessageProps {
  id: string;
  error?: FieldError | string;
}

const FormErrorMessage: FC<FormErrorMessageProps> = ({ id, error }) => {
  return error ? (
    <small
      id={id}
      aria-live="assertive"
      className="flex items-center gap-2 text-sm text-pd-red md:text-base"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-gc-extras-red-1"
      >
        <g>
          <g>
            <path
              id="Vector"
              d="M10 6.45837V10.8334"
              stroke="#992B2B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M17.5665 7.14999V12.85C17.5665 13.7833 17.0665 14.65 16.2582 15.125L11.3082 17.9833C10.4998 18.45 9.49981 18.45 8.68315 17.9833L3.73314 15.125C2.92481 14.6583 2.4248 13.7916 2.4248 12.85V7.14999C2.4248 6.21665 2.92481 5.34995 3.73314 4.87495L8.68315 2.01663C9.49148 1.54996 10.4915 1.54996 11.3082 2.01663L16.2582 4.87495C17.0665 5.34995 17.5665 6.20832 17.5665 7.14999Z"
              stroke="#992B2B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_3"
              d="M10 13.5V13.5833"
              stroke="#992B2B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
      <span className="block">
        {typeof error === "string" ? error : error.message}
      </span>
    </small>
  ) : null;
};

export { FormErrorMessage };