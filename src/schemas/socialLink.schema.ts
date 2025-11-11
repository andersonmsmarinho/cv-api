import { z } from 'zod';

export const createSocialLinkSchema = z.object({
  body: z.object({
    platform: z.string().min(1, 'Plataforma é obrigatória'),
    url: z.string().url('URL inválida'),
  }),
  params: z.object({
    profileId: z.string().uuid('ID do perfil inválido'),
  }),
});

export const updateSocialLinkSchema = z.object({
  body: z.object({
    platform: z.string().min(1, 'Plataforma é obrigatória').optional(),
    url: z.string().url('URL inválida').optional(),
  }),
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export const socialLinkParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid('ID inválido'),
  }),
});

export type CreateSocialLinkInput = z.infer<typeof createSocialLinkSchema>['body'];
export type UpdateSocialLinkInput = z.infer<typeof updateSocialLinkSchema>['body'];

