import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { auth } from "../configs/auth";

export function ensureAuthenticated(request: Request, response: Response, next:NextFunction) {

    const authHeader = request.headers.authorization;
    
    if(!authHeader){
        throw new AppError("JWT Não informado!", 401);
    }

    const [, token] = authHeader.split(" ");
    console.log(token);

    try {

        const { sub: user_id } = verify(token, auth.jwt.secret);

        request.user = {
            id: Number(user_id)
        }

        return next();

    } catch {
        throw new AppError("JWT Inválido!", 401);
   }
}
