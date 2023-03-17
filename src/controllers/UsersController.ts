import { hash, compare } from "bcryptjs";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { sqliteConnection } from "../database/sqlite";

export class UsersController {

    async create(request: Request, response: Response) {
        
        const { email, name, password } = request.body;

        const database = await sqliteConnection();

        const hashedPassword = await hash(password, 8);
        
        try {
            await database.run('INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword])
        } catch (error) {
            throw new AppError('Este email já está em uso!');
        }

        return response.status(201).json();
    }

    async update(request: Request, response: Response) {

        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?) ', [id]);

        if (!user) {
            throw new AppError('Usuário não encontrado!', 404);
        }

        const userWithTheSameEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (userWithTheSameEmail && userWithTheSameEmail.id !== user.id){
            throw new AppError('Esse email já está em uso!');
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError('Você precisa informar a senha antiga para redefinir a senha!')
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password );

            if(!checkOldPassword){
                throw new AppError('A senha antiga não confere!');
            } 

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?
           `, 
            [user.name, user.email, user.password, id]
        );

        return response.json();
        
    }
} 