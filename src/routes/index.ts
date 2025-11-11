import { Router } from 'express';
import profileRouter from './profile.routes';
import skillRouter from './skill.route';
import experienceRouter from './experience.route';
import educationRouter from './education.route';
import projectRouter from './project.route';
import socialLinkRouter from './socialLink.route';

const v1Router = Router();

v1Router.use('/profiles', profileRouter);
v1Router.use('/skills', skillRouter);
v1Router.use('/experiences', experienceRouter);
v1Router.use('/education', educationRouter);
v1Router.use('/projects', projectRouter);
v1Router.use('/socialLinks', socialLinkRouter);

export default v1Router;