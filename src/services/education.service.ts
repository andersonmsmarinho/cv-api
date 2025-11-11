import { EducationRepository } from '../repositories/education.repository';
import { ProfileRepository } from '../repositories/profile.repository';
import { ApiError } from '../middlewares/errorHandler';
import type { NewEducation } from '../../drizzle/schema';

export const EducationService = {
    createEducation: async (profileId: string, data: Omit<NewEducation, 'profileId'>) => {
        // Verificar se o perfil existe
        const profile = await ProfileRepository.findById(profileId);
        if (!profile) {
            throw new ApiError(404, 'Perfil não encontrado');
        }

        const dataWithProfile = {
            ...data,
            profileId,
        };
        return EducationRepository.create(dataWithProfile);
    },

    updateEducation: async (id: string, data: Partial<NewEducation>) => {
        const education = await EducationRepository.findById(id);
        if (!education) {
            throw new ApiError(404, 'Formação não encontrada');
        }
        return EducationRepository.update(id, data);
    },

    deleteEducation: async (id: string) => {
        const education = await EducationRepository.findById(id);
        if (!education) {
            throw new ApiError(404, 'Formação não encontrada');
        }
        return EducationRepository.delete(id);
    },
};
