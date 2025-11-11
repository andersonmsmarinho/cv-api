import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.service';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const ProjectController = {
    create: asyncHandler(async (req: Request, res: Response) => {
        const { profileId } = req.params;
        const newProject = await ProjectService.createProject(profileId, req.body);
        res.status(201).json(newProject);
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedProject = await ProjectService.updateProject(id, req.body);
        res.status(200).json(updatedProject);
    }),

    delete: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await ProjectService.deleteProject(id);
        res.status(204).send();
    }),
};

