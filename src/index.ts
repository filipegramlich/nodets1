import express, { Request, Response } from 'express';
import 'express-async-errors';
import { AppError } from './utils/AppError';
import { routes } from './routes';

const app = express();
const port = 3333;

app.use(express.json());

app.use(routes);

app.use((error:any, request: Request, response: Response, next:any) => {

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


