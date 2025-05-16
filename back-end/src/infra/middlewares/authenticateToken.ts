import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

// Tipagem global (relembrando: se você já fez isso, ótimo)
declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        cpf: string;
        perfil: 'C' | 'R' | 'M';
      };
    }
  }
}

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      cpf: string;
      perfil: 'C' | 'R' | 'M';
    };

    req.usuario = {
      id: decoded.id,
      cpf: decoded.cpf,
      perfil: decoded.perfil,
    };

    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido ou expirado." });
  }
};