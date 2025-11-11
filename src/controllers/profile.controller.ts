import { Request, Response, NextFunction } from 'express';
import { ProfileService } from '../services/profile.service';
import { ApiError } from '../middlewares/errorHandler';

// Funções utilitárias (para manter os handlers limpos)
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const ProfileController = {
    getAll: asyncHandler(async (_req: Request, res: Response) => {
        const profiles = await ProfileService.getAllProfiles();
        res.status(200).json(profiles);
    }),

    getById: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const profile = await ProfileService.getProfileById(id);
        if (!profile) {
            throw new ApiError(404, 'Perfil não encontrado');
        }
        res.status(200).json(profile);
    }),

    create: asyncHandler(async (req: Request, res: Response) => {
        // TODO: Adicionar validação Zod aqui
        const newProfile = await ProfileService.createProfile(req.body);
        res.status(201).json(newProfile);
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        // TODO: Adicionar validação Zod aqui
        const updatedProfile = await ProfileService.updateProfile(id, req.body);
        res.status(200).json(updatedProfile);
    }),

    delete: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await ProfileService.deleteProfile(id);
        res.status(204).send(); // No content
    }),

    // Relações m-n (Skills)
    addSkill: asyncHandler(async (req: Request, res: Response) => {
        const { profileId, skillId } = req.params;
        const profile = await ProfileService.addSkillToProfile(profileId, skillId);
        res.status(200).json(profile);
    }),

    removeSkill: asyncHandler(async (req: Request, res: Response) => {
        const { profileId, skillId } = req.params;
        const profile = await ProfileService.removeSkillFromProfile(profileId, skillId);
        res.status(200).json(profile);
    }),
};