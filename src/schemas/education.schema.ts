import { z } from 'zod';

export const createEducationSchema = z.object({
  body: z.object({
    institution: z.string().min(1, 'Instituição é obrigatória'),
    degree: z.string().min(1, 'Grau é obrigatório'),
    fieldOfStudy: z.string().optional(),
    startDate: z.string().datetime('Data de início inválida'),
    endDate: z.string().datetime('Data de término inválida').optional().nullable(),
    description: z.string().optional(),
  }),
  params: z.object({
    profileId: z.string().uuid('ID do perfil inválido'),
  }),
});

export const updateEducationSchema = z.object({
  body: z.object({
    institution: z.string().min(1, 'Instituição é obrigatória').optional(),
    degree: z.string().min(1, 'Grau é obrigatório').optional(),
    fieldOfStudy: z.string().optional(),
    startDate: z.string().datetime('Data de início inválida').optional(),
    endDate: z.string().datetime('Data de término inválida').optional().nullable(),
    description: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export const educationParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export type CreateEducationInput = z.infer<typeof createEducationSchema>['body'];
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>['body'];

