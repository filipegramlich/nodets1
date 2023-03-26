import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { notesRoutes } from './notes.routes';
import { tagsRoutes } from './tags.routes';
import { sessionsRoutes } from './sessions.routes';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/notes', notesRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/sessions', sessionsRoutes);

