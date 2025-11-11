import { SkillRepository } from '../repositories/skill.repository';

export const SkillService = {
    getAllSkills: async () => {
        return SkillRepository.findAll();
    },

    createSkill: async (name: string) => {
        // Lógica de negócios: normalizar o nome
        const normalizedName = name.trim().toLowerCase();
        // Opcionalmente, verificar se já existe (embora o repo vá tratar)
        return SkillRepository.create(normalizedName);
    },
};