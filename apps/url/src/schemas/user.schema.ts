import { z } from 'zod';
import { Url } from './url.schema';

export const authSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type AuthBody = z.infer<typeof authSchema>;
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  Url: Url[];
};
