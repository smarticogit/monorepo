import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const authSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const tokenSchema = z.object({
  sub: z.string(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type AuthBody = z.infer<typeof authSchema>;
export type Token = z.infer<typeof tokenSchema>;
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  Url: Url[];
};

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
