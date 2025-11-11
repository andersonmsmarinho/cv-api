import { db } from '../config/db';
import { education } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import type { NewEducation } from '../../drizzle/schema';

export const EducationRepository = {
    create: async (data: NewEducation) => {
        const [newEducation] = await db.insert(education).values(data).returning();
        return newEducation;
    },

    update: async (id: string, data: Partial<NewEducation>) => {
        const [updatedEducation] = await db
            .update(education)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(education.id, id))
            .returning();
        return updatedEducation || null;
    },

    delete: async (id: string) => {
        await db.delete(education).where(eq(education.id, id));
    },

    findById: async (id: string) => {
        const [edu] = await db
            .select()
            .from(education)
            .where(eq(education.id, id))
            .limit(1);
        return edu || null;
    },
};
