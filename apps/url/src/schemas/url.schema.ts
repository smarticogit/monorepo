import { z } from 'zod';

export const urlCreateBodySchema = z.object({
  original: z.string().url({ message: 'Invalid URL' }),
  short: z.string().url().optional(),
});

export type UrlCreateBody = z.infer<typeof urlCreateBodySchema>;
