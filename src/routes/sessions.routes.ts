import { Router } from "express";
import { SectionsController } from "../controllers/SessionsController";

const sectionsController = new SectionsController;

export const sessionsRoutes = Router();

sessionsRoutes.post('/', sectionsController.create);