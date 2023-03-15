import { Router } from 'express';

import { usersRoutes } from 'users.routes';

const routes = Router();

routes.use('/users', usersRoutes);



module.exports = routes;