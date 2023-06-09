import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors'
import { AppError } from './utils/AppError';
import { routes } from './routes';
import { migrationsRun } from './database/sqlite/migrations';
import { UPLOAD_FOLDER } from './configs/upload';

const app = express();
app.use(cors());

const port = 3001;

migrationsRun();

app.use(express.json());
app.use(routes);

app.use('/files', express.static(UPLOAD_FOLDER));

app.use((error:Error, request: Request, response: Response, next:NextFunction) => {

    if (error instanceof AppError) {
        
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });

    }

    console.log(error.message)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error - index.ts'
    });

});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


