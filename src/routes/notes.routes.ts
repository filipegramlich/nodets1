import { Router } from "express";
import { NotesController } from "../controllers/NotesController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

export const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated)

notesRoutes.get('/', notesController.index);
notesRoutes.post('/', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);
