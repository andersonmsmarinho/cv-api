import { Router } from 'express';
import { SkillController } from '../controllers/skill.controller';
import { validate } from '../utils/validate';
import { createSkillSchema } from '../schemas/skill.schema';

const skillRouter = Router();

skillRouter.get('/', SkillController.getAll);
skillRouter.post('/', validate(createSkillSchema), SkillController.create); // Cria uma nova skill na taxonomia

export default skillRouter;