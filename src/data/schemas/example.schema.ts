import { z } from "zod";

/**
 * @description representing the shape of a data entity, using Zod
 */
export const exampleSchema = z.object({
    title: z.string(),
    description: z.string()
});

/**
 * @description a generated type for `exampleSchema`
 */
export type ExampleData = z.infer<typeof exampleSchema>;