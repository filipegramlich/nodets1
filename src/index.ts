import express, { Request, Response, query, response } from 'express';

const routes = require('./routes')
const app = express();
const port = 3000;

app.use(routes)
app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


