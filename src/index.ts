import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './utils/AppError';
import { routes } from './routes';
import { migrationsRun } from './database/sqlite/migrations';
import 'express-async-errors';

const app = express();
const port = 3333;

migrationsRun();

app.use(express.json());
app.use(routes);

app.use((error:Error, request: Request, response: Response, next:NextFunction) => {

    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });

});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


