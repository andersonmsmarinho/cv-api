import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import v1Router from './routes'; // Importa o roteador principal da v1

// Cria a instância do app
const app: Express = express();

// Middlewares globais
app.use(cors()); // Habilita CORS
app.use(express.json()); // Parseia JSON no body

// Rota de Health Check
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
});

// Monta o roteador principal da API na v1
app.use('/api/v1', v1Router);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

export default app;