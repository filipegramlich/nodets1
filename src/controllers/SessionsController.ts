import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
const knex = require("../database/knex");
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { auth } from "../configs/auth";

export class SessionsController {

    async create(request: Request, response: Response) {

        const { email, password } = request.body;

        const user = await knex('users').where({email}).first();
        
        const { expiresIn, secret } = auth.jwt
        
        const token = sign( {}, secret, {
            subject: String(user.id),
            expiresIn
        });

        if(!user) {
            throw new AppError('Email e/ou senha incorreta!', 401)
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError('Email e/ou senha incorreta!', 401)
        }

        return response.json({ user, token })
    }

}