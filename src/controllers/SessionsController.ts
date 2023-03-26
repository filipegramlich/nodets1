import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
const knex = require("../database/knex");
import { compare } from "bcryptjs";


export class SectionsController {

    async create(request: Request, response: Response) {

        const { email, password } = request.body;

        const user = await knex('users').where({email}).first();

        if(!user) {
            throw new AppError('Email e/ou senha incorreta!', 401)
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError('Email e/ou senha incorreta!', 401)
        }

        return response.json({ user })
    }

}