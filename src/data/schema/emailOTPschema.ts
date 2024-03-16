import { z } from "zod";

export const transactionPinSchema = z.string().refine(
  (value) => {
    return /^\d{6}$/.test(value);
  },
  {
    message: "PIN should be 6 digits",
  },
);