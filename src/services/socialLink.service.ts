import { SocialLinkRepository } from '../repositories/socialLink.repository';
import { ProfileRepository } from '../repositories/profile.repository';
import { ApiError } from '../middlewares/errorHandler';
import type { NewSocialLink } from '../../drizzle/schema';

export const SocialLinkService = {
    createSocialLink: async (profileId: string, data: Omit<NewSocialLink, 'profileId'>) => {
        // Verificar se o perfil existe
        const profile = await ProfileRepository.findById(profileId);
        if (!profile) {
            throw new ApiError(404, 'Perfil não encontrado');
        }

        const dataWithProfile = {
            ...data,
            profileId,
        };
        return SocialLinkRepository.create(dataWithProfile);
    },

    updateSocialLink: async (id: string, data: Partial<NewSocialLink>) => {
        const socialLink = await SocialLinkRepository.findById(id);
        if (!socialLink) {
            throw new ApiError(404, 'Link social não encontrado');
        }
        return SocialLinkRepository.update(id, data);
    },

    deleteSocialLink: async (id: string) => {
        const socialLink = await SocialLinkRepository.findById(id);
        if (!socialLink) {
            throw new ApiError(404, 'Link social não encontrado');
        }
        return SocialLinkRepository.delete(id);
    },
};
