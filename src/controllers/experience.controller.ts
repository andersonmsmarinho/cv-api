import { Request, Response, NextFunction } from 'express';
import { ExperienceService } from '../services/experience.service';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const ExperienceController = {
    create: asyncHandler(async (req: Request, res: Response) => {
        const { profileId } = req.params;
        // Converter datas de string para Date
        const data = {
            ...req.body,
            startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
            endDate: req.body.endDate ? new Date(req.body.endDate) : (req.body.endDate === null ? null : undefined),
        };
        const newExperience = await ExperienceService.createExperience(profileId, data);
        res.status(201).json(newExperience);
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        // Converter datas de string para Date se presentes
        const data = {
            ...req.body,
            startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
            endDate: req.body.endDate !== undefined 
                ? (req.body.endDate ? new Date(req.body.endDate) : null)
                : undefined,
        };
        const updatedExperience = await ExperienceService.updateExperience(id, data);
        res.status(200).json(updatedExperience);
    }),

    delete: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await ExperienceService.deleteExperience(id);
        res.status(204).send();
    }),
};