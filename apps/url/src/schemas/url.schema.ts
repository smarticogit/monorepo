import { z } from 'zod';
import { User } from './user.schema';

export const createUrlSchema = z.object({
  url_original: z.string().url({ message: 'Invalid URL' }),
});

export const findUrlSchema = z.object({
  url_short: z.string().url({ message: 'Invalid URL' }),
});

export const tokenSchema = z.object({
  sub: z.string(),
});

export type CreateUrl = z.infer<typeof createUrlSchema>;
export type FindUrl = z.infer<typeof findUrlSchema>;
export type Token = z.infer<typeof tokenSchema>;

export type Url = {
  id: string;
  original: string;
  short: string;
  userId: string;
  user: User;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
