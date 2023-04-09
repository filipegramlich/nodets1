import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { UsersAvatarController} from "../controllers/UsersAvatarController";
import { MULTER } from '../configs/upload';
import multer from "multer";


export const usersRoutes = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(MULTER)

usersRoutes.post('/', usersController.create);

usersRoutes.put('/', ensureAuthenticated, usersController.update);

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarController.update);
