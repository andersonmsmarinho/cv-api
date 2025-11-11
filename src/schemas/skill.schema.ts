import { z } from 'zod';

export const createSkillSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Nome da habilidade é obrigatório'),
  }),
});

export const skillParamsSchema = z.object({
  params: z.object({
    profileId: z.string().uuid('ID do perfil inválido'),
    skillId: z.string().uuid('ID da habilidade inválido'),
  }),
});

export type CreateSkillInput = z.infer<typeof createSkillSchema>['body'];

