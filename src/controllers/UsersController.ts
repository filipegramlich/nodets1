import { Request, Response } from "express";

export class UsersController {
    create( request:Request, response:Response ){

        const { email, name, age } = request.body;
        response.status(201).json(`Nome: ${name}, Email: ${email}, Idade: ${age}`);

    }

}