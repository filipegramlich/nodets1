import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { MULTER } from '../configs/upload';
import multer from "multer";


export const usersRoutes = Router();

const usersController = new UsersController();

const upload = multer(MULTER)

usersRoutes.post('/', usersController.create);

usersRoutes.put('/', ensureAuthenticated, usersController.update);

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), (request, response) => {
    console.log(request.file?.filename);
    response.json();
});
