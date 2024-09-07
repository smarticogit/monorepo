import { z } from 'zod';

export const userCreateBodySchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const userAuthBodySchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const tokenSchema = z.object({
  sub: z.string(),
});

export type UserCreateBody = z.infer<typeof userCreateBodySchema>;
export type UserAuthBody = z.infer<typeof userAuthBodySchema>;
export type TokenSchema = z.infer<typeof tokenSchema>;
