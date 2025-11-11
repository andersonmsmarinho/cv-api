import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    url: z.string().url('URL inválida').optional().nullable(),
    repositoryUrl: z.string().url('URL do repositório inválida').optional().nullable(),
  }),
  params: z.object({
    profileId: z.string().uuid('ID do perfil inválido'),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Nome é obrigatório').optional(),
    description: z.string().min(1, 'Descrição é obrigatória').optional(),
    url: z.string().url('URL inválida').optional().nullable(),
    repositoryUrl: z.string().url('URL do repositório inválida').optional().nullable(),
  }),
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export const projectParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>['body'];
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>['body'];

