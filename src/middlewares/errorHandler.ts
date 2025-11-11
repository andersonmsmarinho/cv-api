import { Request, Response, NextFunction } from 'express';

// Classe de Erro customizada
export class ApiError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}

// O middleware de tratamento de erros
export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error('Erro:', err);
    console.error('Stack:', err.stack);

    // Erros customizados da API
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    // Erros de validação do Zod
    if (err.name === 'ZodError') {
        return res.status(400).json({
            message: 'Erro de validação',
            errors: (err as any).errors,
        });
    }

    // Erros de banco de dados (PostgreSQL/Neon)
    const errorMessage = err.message?.toLowerCase() || '';
    
    if (errorMessage.includes('duplicate key') || 
        errorMessage.includes('unique constraint') ||
        errorMessage.includes('violates unique constraint')) {
        return res.status(409).json({
            message: 'Já existe um registro com este valor único',
        });
    }

    // Erros de email já cadastrado
    if (errorMessage.includes('email já cadastrado')) {
        return res.status(409).json({
            message: err.message,
        });
    }

    if (errorMessage.includes('foreign key') || 
        errorMessage.includes('violates foreign key constraint')) {
        return res.status(400).json({
            message: 'Referência inválida',
        });
    }

    if (errorMessage.includes('not found')) {
        return res.status(404).json({
            message: 'Registro não encontrado',
        });
    }

    // Erros genéricos - retornar mensagem apenas em desenvolvimento
    const isDevelopment = process.env.NODE_ENV !== 'production';
    return res.status(500).json({
        message: 'Erro interno do servidor',
        ...(isDevelopment && { error: err.message, stack: err.stack }),
    });
};
