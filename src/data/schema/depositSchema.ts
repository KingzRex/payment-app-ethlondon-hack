import { z } from "zod";

export const depositFiatSchema = z.object({
  amount: z.coerce.number().positive().min(500),
});

export type DepositFiatData = z.infer<typeof depositFiatSchema>;