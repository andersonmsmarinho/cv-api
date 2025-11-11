import { ProjectRepository } from '../repositories/project.repository';
import { ProfileRepository } from '../repositories/profile.repository';
import { ApiError } from '../middlewares/errorHandler';
import type { NewProject } from '../../drizzle/schema';

export const ProjectService = {
    createProject: async (profileId: string, data: Omit<NewProject, 'profileId'>) => {
        // Verificar se o perfil existe
        const profile = await ProfileRepository.findById(profileId);
        if (!profile) {
            throw new ApiError(404, 'Perfil não encontrado');
        }

        const dataWithProfile = {
            ...data,
            profileId,
        };
        return ProjectRepository.create(dataWithProfile);
    },

    updateProject: async (id: string, data: Partial<NewProject>) => {
        const project = await ProjectRepository.findById(id);
        if (!project) {
            throw new ApiError(404, 'Projeto não encontrado');
        }
        return ProjectRepository.update(id, data);
    },

    deleteProject: async (id: string) => {
        const project = await ProjectRepository.findById(id);
        if (!project) {
            throw new ApiError(404, 'Projeto não encontrado');
        }
        return ProjectRepository.delete(id);
    },
};
