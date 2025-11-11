import { db } from '../config/db';
import { projects } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import type { NewProject } from '../../drizzle/schema';

export const ProjectRepository = {
    create: async (data: NewProject) => {
        const [newProject] = await db.insert(projects).values(data).returning();
        return newProject;
    },

    update: async (id: string, data: Partial<NewProject>) => {
        const [updatedProject] = await db
            .update(projects)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(projects.id, id))
            .returning();
        return updatedProject || null;
    },

    delete: async (id: string) => {
        await db.delete(projects).where(eq(projects.id, id));
    },

    findById: async (id: string) => {
        const [project] = await db
            .select()
            .from(projects)
            .where(eq(projects.id, id))
            .limit(1);
        return project || null;
    },
};
