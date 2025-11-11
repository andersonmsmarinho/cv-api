import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { validate } from '../utils/validate';
import {
    createProfileSchema,
    updateProfileSchema,
    profileParamsSchema,
} from '../schemas/profile.schema';
import { skillParamsSchema } from '../schemas/skill.schema';

const profileRouter = Router();

profileRouter.get('/', ProfileController.getAll);
profileRouter.post('/', validate(createProfileSchema), ProfileController.create);
profileRouter.get('/:id', validate(profileParamsSchema), ProfileController.getById);
profileRouter.put('/:id', validate(updateProfileSchema), ProfileController.update);
profileRouter.delete('/:id', validate(profileParamsSchema), ProfileController.delete);

profileRouter.post('/:profileId/skills/:skillId', validate(skillParamsSchema), ProfileController.addSkill);
profileRouter.delete('/:profileId/skills/:skillId', validate(skillParamsSchema), ProfileController.removeSkill);

export default profileRouter;