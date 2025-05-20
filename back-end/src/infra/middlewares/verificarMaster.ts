import { RequestHandler } from "express";

export const verificarMaster: RequestHandler = (req, res, next) => {
  const usuario = req.usuario;

  if (!usuario || usuario.perfil !== 'M') {
    res.status(403).json({ erro: 'Acesso permitido apenas para Administrador Master' });
    return;
  }

  next();
};
