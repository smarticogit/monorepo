import { z } from 'zod';

export const urlCreateBodySchema = z.object({
  original: z.string().url({ message: 'Invalid URL' }),
  short: z.string().url().optional(),
  userId: z.string().uuid().optional(),
  user: z
    .object({
      name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
    })
    .optional(),
});
