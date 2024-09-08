import { z } from 'zod';

export const createUrlSchema = z.object({
  original: z.string().url({ message: 'Invalid URL' }),
});

export const findUrlSchema = z.object({
  short: z.string().url({ message: 'Invalid URL' }),
});

export const tokenSchema = z.object({
  sub: z.string(),
});

export type CreateUrl = z.infer<typeof createUrlSchema>;
export type FindUrl = z.infer<typeof findUrlSchema>;
export type Token = z.infer<typeof tokenSchema>;
