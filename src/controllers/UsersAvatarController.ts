import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { DiskStorage } from "../providers/DiskStorage";
const knex = require("../database/knex");

export class UsersAvatarController {
    async update(request: Request, response: Response) {

        const user_id = request.user.id;
        const avatarFileName = request.file?.filename;
        const diskStorage = new DiskStorage;

        const user = await knex('users').where({ id: user_id }).first();

        if (!user) {
            throw new AppError('Somente usuários autenticados podem alterar a foto!', 401);
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        }

        const fileName = await diskStorage.saveFile(avatarFileName);
        user.avatar = fileName;

        await knex('users').update(user).where({ id: user_id });

        return response.json(user);

    }
}