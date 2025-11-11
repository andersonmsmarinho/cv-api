import { Request, Response, NextFunction } from 'express';
import { EducationService } from '../services/education.service';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const EducationController = {
    create: asyncHandler(async (req: Request, res: Response) => {
        const { profileId } = req.params;
        // Converter datas de string para Date
        const data = {
            ...req.body,
            startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
            endDate: req.body.endDate ? new Date(req.body.endDate) : (req.body.endDate === null ? null : undefined),
        };
        const newEducation = await EducationService.createEducation(profileId, data);
        res.status(201).json(newEducation);
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
        const updatedEducation = await EducationService.updateEducation(id, data);
        res.status(200).json(updatedEducation);
    }),

    delete: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await EducationService.deleteEducation(id);
        res.status(204).send();
    }),
};

