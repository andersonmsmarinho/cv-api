import { z } from 'zod';

export const createProfileSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido'),
    name: z.string().min(1, 'Nome é obrigatório'),
    headline: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido').optional(),
    name: z.string().min(1, 'Nome é obrigatório').optional(),
    headline: z.string().optional(),
    bio: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export const profileParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>['body'];
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>['body'];

