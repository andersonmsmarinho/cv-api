import { Router } from 'express';
import { ExperienceController } from '../controllers/experience.controller';
import { validate } from '../utils/validate';
import {
    createExperienceSchema,
    updateExperienceSchema,
    experienceParamsSchema,
} from '../schemas/experience.schema';

const experienceRouter = Router();

// Rota para criar uma experiência para um perfil específico
experienceRouter.post(
    '/profile/:profileId',
    validate(createExperienceSchema),
    ExperienceController.create
);

// Rotas para gerenciar uma experiência existente
experienceRouter.put(
    '/:id',
    validate(updateExperienceSchema),
    ExperienceController.update
);

experienceRouter.delete(
    '/:id',
    validate(experienceParamsSchema),
    ExperienceController.delete
);

export default experienceRouter;