import { db } from '../config/db';
import { experiences } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import type { NewExperience } from '../../drizzle/schema';

export const ExperienceRepository = {
    create: async (data: NewExperience) => {
        const [newExperience] = await db.insert(experiences).values(data).returning();
        return newExperience;
    },

    update: async (id: string, data: Partial<NewExperience>) => {
        const [updatedExperience] = await db
            .update(experiences)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(experiences.id, id))
            .returning();
        return updatedExperience || null;
    },

    delete: async (id: string) => {
        await db.delete(experiences).where(eq(experiences.id, id));
    },

    findById: async (id: string) => {
        const [experience] = await db
            .select()
            .from(experiences)
            .where(eq(experiences.id, id))
            .limit(1);
        return experience || null;
    },
};
