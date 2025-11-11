import { db } from '../config/db';
import { skills } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

export const SkillRepository = {
    findAll: async () => {
        return db.select().from(skills);
    },

    create: async (name: string) => {
        // Normalizar nome
        const normalizedName = name.trim().toLowerCase();
        
        // Verificar se já existe
        const existing = await db
            .select()
            .from(skills)
            .where(eq(skills.name, normalizedName))
            .limit(1);

        if (existing.length > 0) {
            return existing[0];
        }

        // Criar nova skill
        const [newSkill] = await db.insert(skills).values({ name: normalizedName }).returning();
        return newSkill;
    },
};
