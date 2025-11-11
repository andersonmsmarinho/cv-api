import { Request, Response, NextFunction } from 'express';
import { SocialLinkService } from '../services/socialLink.service';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const SocialLinkController = {
    create: asyncHandler(async (req: Request, res: Response) => {
        const { profileId } = req.params;
        const newSocialLink = await SocialLinkService.createSocialLink(profileId, req.body);
        res.status(201).json(newSocialLink);
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedSocialLink = await SocialLinkService.updateSocialLink(id, req.body);
        res.status(200).json(updatedSocialLink);
    }),

    delete: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await SocialLinkService.deleteSocialLink(id);
        res.status(204).send();
    }),
};

