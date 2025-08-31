import type { Request, Response, NextFunction } from "express";
import { Prisma } from '@prisma/client';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            return res.status(404).json({
                error: "Recurso não encontrado",
                message: err.meta?.cause || "O registro que você tentou acessar não existe."
            });
        }
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2003") {
            return res.status(400).json({
                success: false,
                error: "Violação de integridade",
                message: "Não é possível excluir este usuário pois ainda possui registros relacionados."
            })
        }
    }

    console.log(err);

    return res.status(500).json({
        error: 'Ocorreu um erro interno no servidor.',
        message: 'Por favor, tente novamente mais tarde.'
    });


}

