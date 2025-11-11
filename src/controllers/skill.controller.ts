import { Request, Response, NextFunction } from 'express';
import { SkillService } from '../services/skill.service';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const SkillController = {
    getAll: asyncHandler(async (_req: Request, res: Response) => {
        const skills = await SkillService.getAllSkills();
        res.status(200).json(skills);
    }),

    create: asyncHandler(async (req: Request, res: Response) => {
        const { name } = req.body;
        const newSkill = await SkillService.createSkill(name);
        res.status(201).json(newSkill);
    }),
};

