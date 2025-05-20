import { Request, Response, NextFunction } from "express";

export function verificarRestritoOuMaster(req: Request, res: Response, next: NextFunction) {
    if (req.usuario?.perfil === 'C') {
        return res.status(403).json({ erro: 'Acesso permitido apenas para administradores' });
    }
    next();
}