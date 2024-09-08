import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3001),
  JWT_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;
