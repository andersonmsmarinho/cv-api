import { ProfileRepository } from '../repositories/profile.repository';
import type { NewProfile } from '../../drizzle/schema';
import { ApiError } from '../middlewares/errorHandler';

export const ProfileService = {
    getAllProfiles: async () => {
        // Lógica de negócios (ex: paginação) iria aqui
        return ProfileRepository.findAll();
    },

    getProfileById: async (id: string) => {
        // Busca o perfil completo com todas as relações
        return ProfileRepository.findById(id);
    },

    createProfile: async (data: NewProfile) => {
        // Lógica de negócios (ex: verificar se email já existe)
        const existing = await ProfileRepository.findByEmail(data.email);
        if (existing) {
            throw new ApiError(409, 'Email já cadastrado');
        }
        return ProfileRepository.create(data);
    },

    updateProfile: async (id: string, data: Partial<NewProfile>) => {
        return ProfileRepository.update(id, data);
    },

    deleteProfile: async (id: string) => {
        return ProfileRepository.delete(id);
    },

    // Lógica de negócios para relação m-n (Skills)
    addSkillToProfile: async (profileId: string, skillId: string) => {
        return ProfileRepository.addSkill(profileId, skillId);
    },

    removeSkillFromProfile: async (profileId: string, skillId: string) => {
        return ProfileRepository.removeSkill(profileId, skillId);
    },
};
