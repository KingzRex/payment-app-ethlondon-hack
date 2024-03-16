import { z } from "zod";

export const depositFiatSchema = z.object({
    amount: z.coerce.number().positive(),
});

export type DepositFiatData = z.infer<typeof depositFiatSchema>;