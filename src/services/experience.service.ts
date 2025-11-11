import { ExperienceRepository } from '../repositories/experience.repository';
import { ProfileRepository } from '../repositories/profile.repository';
import { ApiError } from '../middlewares/errorHandler';
import type { NewExperience } from '../../drizzle/schema';

export const ExperienceService = {
    createExperience: async (profileId: string, data: Omit<NewExperience, 'profileId'>) => {
        // Verificar se o perfil existe
        const profile = await ProfileRepository.findById(profileId);
        if (!profile) {
            throw new ApiError(404, 'Perfil não encontrado');
        }

        const dataWithProfile = {
            ...data,
            profileId,
        };
        return ExperienceRepository.create(dataWithProfile);
    },

    updateExperience: async (id: string, data: Partial<NewExperience>) => {
        const experience = await ExperienceRepository.findById(id);
        if (!experience) {
            throw new ApiError(404, 'Experiência não encontrada');
        }
        return ExperienceRepository.update(id, data);
    },

    deleteExperience: async (id: string) => {
        const experience = await ExperienceRepository.findById(id);
        if (!experience) {
            throw new ApiError(404, 'Experiência não encontrada');
        }
        return ExperienceRepository.delete(id);
    },
};
