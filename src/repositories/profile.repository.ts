import { db } from '../config/db';
import { profiles, profileSkills, skills, socialLinks, experiences, education, projects } from '../../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import type { NewProfile } from '../../drizzle/schema';

export const ProfileRepository = {
    findAll: async () => {
        const allProfiles = await db.select().from(profiles);
        
        // Buscar skills para cada perfil
        const profilesWithSkills = await Promise.all(
            allProfiles.map(async (profile) => {
                const profileSkillsData = await db
                    .select({
                        skill: skills,
                    })
                    .from(profileSkills)
                    .innerJoin(skills, eq(profileSkills.skillId, skills.id))
                    .where(eq(profileSkills.profileId, profile.id));
                
                return {
                    ...profile,
                    skills: profileSkillsData.map(ps => ps.skill),
                };
            })
        );
        
        return profilesWithSkills;
    },

    findById: async (id: string) => {
        const [profile] = await db
            .select()
            .from(profiles)
            .where(eq(profiles.id, id))
            .limit(1);

        if (!profile) {
            return null;
        }

        // Buscar todas as relações
        const [socialLinksData, experiencesData, educationData, projectsData, profileSkillsData] = await Promise.all([
            db.select().from(socialLinks).where(eq(socialLinks.profileId, id)),
            db.select().from(experiences).where(eq(experiences.profileId, id)),
            db.select().from(education).where(eq(education.profileId, id)),
            db.select().from(projects).where(eq(projects.profileId, id)),
            db
                .select({
                    skill: skills,
                })
                .from(profileSkills)
                .innerJoin(skills, eq(profileSkills.skillId, skills.id))
                .where(eq(profileSkills.profileId, id)),
        ]);

        return {
            ...profile,
            skills: profileSkillsData.map(ps => ps.skill),
            socialLinks: socialLinksData,
            experiences: experiencesData,
            education: educationData,
            projects: projectsData,
        };
    },

    findByEmail: async (email: string) => {
        const [profile] = await db
            .select()
            .from(profiles)
            .where(eq(profiles.email, email))
            .limit(1);
        return profile || null;
    },

    create: async (data: NewProfile) => {
        const [newProfile] = await db.insert(profiles).values(data).returning();
        return newProfile;
    },

    update: async (id: string, data: Partial<NewProfile>) => {
        const [updatedProfile] = await db
            .update(profiles)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(profiles.id, id))
            .returning();
        
        if (!updatedProfile) {
            return null;
        }

        // Buscar todas as relações para retornar
        const [socialLinksData, experiencesData, educationData, projectsData, profileSkillsData] = await Promise.all([
            db.select().from(socialLinks).where(eq(socialLinks.profileId, id)),
            db.select().from(experiences).where(eq(experiences.profileId, id)),
            db.select().from(education).where(eq(education.profileId, id)),
            db.select().from(projects).where(eq(projects.profileId, id)),
            db
                .select({
                    skill: skills,
                })
                .from(profileSkills)
                .innerJoin(skills, eq(profileSkills.skillId, skills.id))
                .where(eq(profileSkills.profileId, id)),
        ]);

        return {
            ...updatedProfile,
            skills: profileSkillsData.map(ps => ps.skill),
            socialLinks: socialLinksData,
            experiences: experiencesData,
            education: educationData,
            projects: projectsData,
        };
    },

    delete: async (id: string) => {
        await db.delete(profiles).where(eq(profiles.id, id));
    },

    // Operações relacionais (m-n Skills)
    addSkill: async (profileId: string, skillId: string) => {
        // Verificar se já existe
        const existing = await db
            .select()
            .from(profileSkills)
            .where(and(
                eq(profileSkills.profileId, profileId),
                eq(profileSkills.skillId, skillId)
            ))
            .limit(1);

        if (existing.length === 0) {
            await db.insert(profileSkills).values({
                profileId,
                skillId,
            });
        }

        // Retornar perfil com skills
        const profile = await ProfileRepository.findById(profileId);
        return profile;
    },

    removeSkill: async (profileId: string, skillId: string) => {
        await db
            .delete(profileSkills)
            .where(and(
                eq(profileSkills.profileId, profileId),
                eq(profileSkills.skillId, skillId)
            ));

        // Retornar perfil com skills
        const profile = await ProfileRepository.findById(profileId);
        return profile;
    },
};
