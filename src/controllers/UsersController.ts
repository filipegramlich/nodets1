import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { sqliteConnection } from "../database/sqlite";

export class UsersController {

    async create(request: Request, response: Response) {

        const { email, name, password } = request.body;

        const database = await sqliteConnection();

        const checkUserExists = await database.get('SELECT email FROM users WHERE email = (?)', [email]);

        if (checkUserExists) {
            throw new AppError('Este email já está em uso!');
        }

        await database.run('INSERT INTO users(name, email, password) VALUES (?, ?, ?)', 
        [name, email, password]);

        return response.status(201).json();
    }
}