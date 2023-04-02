import { Router } from "express";
import { TagsController } from "../controllers/TagsController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";


export const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.use(ensureAuthenticated);

tagsRoutes.get('/', tagsController.index);

