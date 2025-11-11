import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { validate } from '../utils/validate';
import {
    createProjectSchema,
    updateProjectSchema,
    projectParamsSchema,
} from '../schemas/project.schema';

const projectRouter = Router();

// Rota para criar um projeto para um perfil específico
projectRouter.post(
    '/profile/:profileId',
    validate(createProjectSchema),
    ProjectController.create
);

// Rotas para gerenciar um projeto existente
projectRouter.put(
    '/:id',
    validate(updateProjectSchema),
    ProjectController.update
);

projectRouter.delete(
    '/:id',
    validate(projectParamsSchema),
    ProjectController.delete
);

export default projectRouter;

