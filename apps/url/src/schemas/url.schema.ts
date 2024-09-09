import { z } from 'zod';

export const createUrlSchema = z.object({
  url_original: z.string().url({ message: 'Invalid URL' }),
});

export const findUrlSchema = z.object({
  url_short: z.string().url({ message: 'Invalid URL' }),
});

export const tokenSchema = z.object({
  sub: z.string(),
});

export type FindUrl = z.infer<typeof findUrlSchema>;
export type Token = z.infer<typeof tokenSchema>;

export type Url = {
  id: string;
  url_original: string;
  url_short: string;
  url_code: string;
  access_count: number;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type CreateUrl = {
  url_original: string;
  url_short: string;
  url_code: string;
  userId?: string;
};
