import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Definimos uma interface para estender o Request e incluir a propriedade 'user'
export interface AuthenticatedRequest extends Request {
    user?: any;
}

// O middleware recebe a requisição, resposta e a função next, e não retorna nada (void)
export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("Token não fornecido.");
        res.redirect("/api/auth/signin");
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            console.log("Token inválido." + token);
            res.status(403).json({ message: "Token inválido." });
            res.redirect("/api/auth/signin");
            return;
        }
        // Se o token for válido, armazena o payload (decoded) na propriedade 'user' do request.
        req.user = decoded;
        // Chama next() para que a execução continue para o próximo middleware ou rota.
        next();
    });
};
