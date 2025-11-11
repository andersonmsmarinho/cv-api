import { db } from '../config/db';
import { socialLinks } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import type { NewSocialLink } from '../../drizzle/schema';

export const SocialLinkRepository = {
    create: async (data: NewSocialLink) => {
        const [newSocialLink] = await db.insert(socialLinks).values(data).returning();
        return newSocialLink;
    },

    update: async (id: string, data: Partial<NewSocialLink>) => {
        const [updatedSocialLink] = await db
            .update(socialLinks)
            .set(data)
            .where(eq(socialLinks.id, id))
            .returning();
        return updatedSocialLink || null;
    },

    delete: async (id: string) => {
        await db.delete(socialLinks).where(eq(socialLinks.id, id));
    },

    findById: async (id: string) => {
        const [socialLink] = await db
            .select()
            .from(socialLinks)
            .where(eq(socialLinks.id, id))
            .limit(1);
        return socialLink || null;
    },
};
