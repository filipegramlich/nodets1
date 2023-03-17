import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { sqliteConnection } from "../database/sqlite";

export class UsersController {

    async create(request: Request, response: Response) {
        
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

        console.log('Entrou no método update');

        const { name, email } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        if (!user) {
            console.log('Entrou no check user');
            throw new AppError('Usuário não encontrado!');
        } else if (user) {
            console.log('Passou pelo check user')
        }

        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            console.log("Entrou no check email");
            throw new AppError('Esse email já está em uso!');
        } else if (userWithUpdatedEmail && userWithUpdatedEmail.id == user.id){
            console.log("Passou pelo check email");
        }

        user.name = name;
        user.email = email;

        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            updated_at = ?,
            id = ?`, 
            [user.name, user.email, new Date(), id]
        );

        return response.json();

    }
} 