import { z } from 'zod';

export const urlGenerateBodySchema = z.object({
  original: z.string().url({ message: 'Invalid URL' }),
});

export const urlRedirectBodySchema = z.object({
  short: z.string().url({ message: 'Invalid URL' }),
});

export const tokenSchema = z.object({
  sub: z.string(),
});

export type TokenSchema = z.infer<typeof tokenSchema>;
export type UrlGenerateBody = z.infer<typeof urlGenerateBodySchema>;
export type UrlRedirectBody = z.infer<typeof urlRedirectBodySchema>;
