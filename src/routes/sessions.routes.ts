import { Router } from "express";
import { SessionsController } from "../controllers/SessionsController";

const sessionsController = new SessionsController;

export const sessionsRoutes = Router();

sessionsRoutes.post('/', sessionsController.create);