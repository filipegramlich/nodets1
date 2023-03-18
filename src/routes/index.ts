import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { notesRoutes } from './notes.routes';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/notes', notesRoutes);

