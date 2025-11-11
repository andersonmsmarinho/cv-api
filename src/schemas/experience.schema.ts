import { z } from 'zod';

export const createExperienceSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    company: z.string().min(1, 'Empresa é obrigatória'),
    location: z.string().optional(),
    startDate: z.string().datetime('Data de início inválida'),
    endDate: z.string().datetime('Data de término inválida').optional().nullable(),
    description: z.string().optional(),
  }),
  params: z.object({
    profileId: z.string().uuid('ID do perfil inválido'),
  }),
});

export const updateExperienceSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Título é obrigatório').optional(),
    company: z.string().min(1, 'Empresa é obrigatória').optional(),
    location: z.string().optional(),
    startDate: z.string().datetime('Data de início inválida').optional(),
    endDate: z.string().datetime('Data de término inválida').optional().nullable(),
    description: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export const experienceParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>['body'];
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>['body'];

