import { Router } from 'express';
import { EducationController } from '../controllers/education.controller';
import { validate } from '../utils/validate';
import {
    createEducationSchema,
    updateEducationSchema,
    educationParamsSchema,
} from '../schemas/education.schema';

const educationRouter = Router();

// Rota para criar uma formação para um perfil específico
educationRouter.post(
    '/profile/:profileId',
    validate(createEducationSchema),
    EducationController.create
);

// Rotas para gerenciar uma formação existente
educationRouter.put(
    '/:id',
    validate(updateEducationSchema),
    EducationController.update
);

educationRouter.delete(
    '/:id',
    validate(educationParamsSchema),
    EducationController.delete
);

export default educationRouter;

