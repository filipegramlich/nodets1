import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { sqliteConnection } from "../database/sqlite";

export class UsersController {

    async create(request: Request, response: Response) {
        console.log("Cheguei!!")
        const { email, name, password } = request.body;

        const database = await sqliteConnection();

        const hashedPassword = await hash(password, 8);

        const checkUserExists = await database.get('SELECT email FROM users WHERE email = (?)', [email]);

        if (checkUserExists) {
            throw new AppError('Este email já está em uso!');
        }

        await database.run('INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]);

        return response.status(201).json();
    }

    async update(request: Request, response: Response) {
        console.log('CHEGUEIIIIIII');

        const { name, email } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get(`SELECT * FROM users WHERE id = (?)`, [id]);

        if (!user) {
            console.log("validei")
            throw new AppError('Usuário não encontrado!');
        }

        const userWithUpdatedEmail = await database.get(`SELECT * FROM users WHERE email = (?)`, [email]);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            console.log("Finalmente deu certo !!!!!")
            throw new AppError('Esse email já está em uso!');
        }

        user.name = name;
        user.email = email;

        await database.run(`
            UPDATE users SET 
            name = (?),
            email = (?),
            update_at = (?),
            WHERE id = (?)`, 
            [user.name, user.email, id]
        );

        return response.json();

    }
} 