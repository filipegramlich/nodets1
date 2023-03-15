import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
export class UsersController {
    create( request:Request, response:Response ){

        const { email, name, age } = request.body;
        if(!name){
            throw new AppError("Nome é obrigatório!");
        }
        
        response.status(201).json(`Nome: ${name}, Email: ${email}, Idade: ${age}`);

    }

}