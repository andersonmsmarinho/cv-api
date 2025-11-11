import { Router } from 'express';
import { SocialLinkController } from '../controllers/socialLink.controller';
import { validate } from '../utils/validate';
import {
    createSocialLinkSchema,
    updateSocialLinkSchema,
    socialLinkParamsSchema,
} from '../schemas/socialLink.schema';

const socialLinkRouter = Router();

// Rota para criar um link social para um perfil específico
socialLinkRouter.post(
    '/profile/:profileId',
    validate(createSocialLinkSchema),
    SocialLinkController.create
);

// Rotas para gerenciar um link social existente
socialLinkRouter.put(
    '/:id',
    validate(updateSocialLinkSchema),
    SocialLinkController.update
);

socialLinkRouter.delete(
    '/:id',
    validate(socialLinkParamsSchema),
    SocialLinkController.delete
);

export default socialLinkRouter;

